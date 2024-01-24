import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBoxItem } from 'src/app/components/card-box/card-box.component';
import { CardGameItem } from 'src/app/components/carde-game-tride/carde-game-tride.component';
// import { CardGameItem } from 'src/app/components/card-game/card-game.component';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { BoxService } from 'src/app/services/box/box.service';
import { GameService } from 'src/app/services/game/game.service';
import {
  BoxArticleDTO,
  BoxStatus,
  IBox,
} from 'src/app/store/box/box.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-tried',
  templateUrl: './game-tried.component.html',
  styleUrls: ['./game-tried.component.scss'],
})
export class GameTriedComponent implements OnInit {
  cardBoxItem!: CardBoxItem;
  cardGameItem!: CardGameItem;
  boxDetails: IBox | null = null;
  boxArticle: BoxArticleDTO[] = [];
  randomArticle: BoxArticleDTO | null = null;
  id: any;
  gameStarted = false;
  afficherBoutonJouer: boolean = true;
  afficherBoutonRejouer: boolean = false;
  compteur: number = 0;
  show = true;
  selectedArticleImageUrl: string = '';
  selectedArticleId: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getBoxDetails();
    // this.sharedDataService.getGlobalBoxList().subscribe(data => {
    //   // Refresh details box
    //   if (data !== null) {
    //     this.getBoxDetails();
    //   }
    // });
    this.gameStarted = false;
  }

  // eslint-disable-next-line no-unused-vars
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boxService: BoxService,
    private gameService: GameService,
    private sharedDataService: SharedDataService
  ) {}

  chooseRandomArticle() {
    const articleIds = this.boxArticle.map(item => item.article.id);
    const randomIndex = Math.floor(Math.random() * articleIds.length);
    return articleIds[randomIndex];
  }

  startScrollAnimation() {
    this.show = false;
    this.isAnimationRunning = true;
    let counter = 0;
    this.animationInterval = setInterval(() => {
      const randomArticleId = this.chooseRandomArticle();
      this.selectedArticleId = randomArticleId;
      const selectedArticle = this.boxArticle.find(
        item => item.article.id === this.selectedArticleId
      );
      // console.log('test', selectedArticle);
      if (selectedArticle) {
        this.selectedArticleImageUrl =
          selectedArticle.article.articlePhoto[0]?.photoUrl;
      }

      counter++;

      if (counter > 26) {
        this.show = true;
        clearInterval(this.animationInterval);
        this.isAnimationRunning = false;
      }
    }, 160);
  }

  animationInterval: any;
  isAnimationRunning = false;

  startAnimationButtonClicked() {
    this.startScrollAnimation();
    this.compteur++;
    if (this.compteur >= 1) {
      this.afficherBoutonJouer = false;
      this.afficherBoutonRejouer = true;
    }
  }
  // }

  getBoxDetails() {
    this.boxService
      .getOneBox(this.id, {
        include: {
          boxArticle: {
            include: {
              article: {
                include: {
                  articlePhoto: true,
                  price: true,
                },
              },
            },
          },
          boxType: true,
          boxImage: true,
        },
      })
      .subscribe(data => {
        this.cardBoxItem = this.getCardItemFormatted(data);
        this.boxArticle = data.boxArticle;
        this.boxDetails = data;
      });
  }

  getFormattedGameItems(): CardGameItem[] {
    return this.boxArticle.map(boxArticle => ({
      id: boxArticle?.article?.id,
      title: String(boxArticle?.winningChance) + '%',
      textLeftTop: boxArticle?.article?.designation,
      textLeftBotton: boxArticle?.article?.reference.substring(0, 6),
      // textRight: String(boxArticle?.article?.price?.currentPrice) + '€',
      textRight: String(boxArticle?.article?.price?.currentPrice ?? 0) + '€',
      imageUrl: boxArticle.article.articlePhoto[0]?.photoUrl,
    }));
  }

  getCardItemFormatted(box: IBox): CardBoxItem {
    const closedImage = box.boxImage.find(
      image => image.status === BoxStatus.CLOSED
    );
    const openedImage = box.boxImage.find(
      image => image.status === BoxStatus.OPENED
    );
    const playingImage = box.boxImage.find(
      image => image.status === BoxStatus.PLAYING
    );
    const otherImage = box.boxImage.find(
      image => image.status === BoxStatus.OTHER
    );
    let imageUrlToShow = '';

    if (playingImage) {
      imageUrlToShow = playingImage.photoUrl;
    } else if (openedImage) {
      imageUrlToShow = openedImage.photoUrl;
    } else if (closedImage) {
      imageUrlToShow = closedImage.photoUrl;
    } else if (otherImage) {
      imageUrlToShow = otherImage.photoUrl;
    } else {
      imageUrlToShow = '';
    }

    return {
      id: box.id,
      description: box.description,
      title: box.name,
      subTitle: box.boxType.name,
      textLeft: box.badge,
      textRight: String(box.price) + '€',
      imageUrl: imageUrlToShow,
    };
  }

  goBack(): void {
    localStorage.removeItem('GameId');
    this.router.navigateByUrl(`/detail-box/${this.boxDetails?.id}`);
  }

  getBoxListRigt(): any[] {
    return Array.from({ length: 26 }, () => null);
  }

  getGameList(): any[] {
    return Array.from({ length: 32 }, () => null);
  }

  getGridLayoutStyle(sizeList: number) {
    let numberOfLines = sizeList / 8;
    numberOfLines = Math.ceil(numberOfLines);
    return {
      'grid-template-rows': 'repeat(' + numberOfLines + ', 130px)',
    };
  }

  getBoxImageURL(url: string): string {
    if (url && url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
  getArticleImageURL(url: string): string {
    if (url && url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      // return '/assets/img/coffre-ouvert.png';
      return '/assets/img/image.jpeg';
    } else {
      return url;
    }
  }
}
