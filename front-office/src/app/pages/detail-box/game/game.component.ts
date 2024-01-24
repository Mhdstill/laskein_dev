import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CardGameItem } from 'src/app/components/card-game/card-game.component';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoxService } from 'src/app/services/box/box.service';
import {
  BoxArticleDTO,
  BoxStatus,
  GameDTO,
  GameService,
  IBox,
  UserBoxDTO,
} from 'src/app/services/game/game.service';
import {
  RequestDeliveryDTO,
  RequestExchangeDTO,
  ShoppingCartService,
} from 'src/app/services/shoppingCart/shopping-cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  cardBoxItem!: CardBoxItem;
  cardGameItem!: CardGameItem;
  id: any;
  boxDetail: IBox | undefined;
  box: IBox | undefined;
  boxArticle: BoxArticleDTO[] = [];
  playedfix: any;
  selectedArticleId: string | null = null;
  animationInterval: any;
  isAnimationRunning = false;
  GameIdReturn: any;
  GameReturn: any;
  gameStarted = false;
  gameStatus: any;
  selectedArticleImageUrl: string = '';
  show = true;
  shoppingId: any;
  shoppingIsClaimed: any;
  userBoxIsPlayed: any;
  showModalLivre: boolean = false;
  showModalVendre: boolean = false;

  // eslint-disable-next-line no-unused-vars
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boxService: BoxService,
    private gameService: GameService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private shoppingCartService: ShoppingCartService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // console.log('id userBox', this.id);
    this.getOneUserBox();
    const storedGameId = localStorage.getItem('GameId');
    if (storedGameId) {
      this.GameIdReturn = storedGameId;
      this.getOneGame();
    } else {
      this.sharedDataService.getRefreshGame().subscribe(data => {
        if (data !== null) {
          // refresh Game
          this.getOneGame();
        }
      });
    }
    this.sharedDataService.getRefreshGame().subscribe(data => {
      if (data !== null) {
        // refresh Game
        this.getOneGame();
      }
    });
    this.sharedDataService.getUserBox().subscribe(data => {
      if (data !== null) {
        // refresh userBox
        this.getOneUserBox();
      }
    });
  }

  getPostVendre() {
    const shoppingCartIds: string[] = [this.shoppingId];
    const request: RequestExchangeDTO = {
      shoppingCartId: shoppingCartIds,
    };

    this.shoppingCartService
      .postRequestExchange(request)
      .subscribe(response => {
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: this.translate.instant('panierGameVendre'),
          footer: 'footer',
        });
        localStorage.removeItem('BoxArticle');
        localStorage.removeItem('GameId');
        this.selectedArticleId = null;
        if (response.msg === '0 articles échangés') {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('erreurPageGame'),
            footer: 'footer',
          });
        }
      });
  }

  getPostLivre() {
    const shoppingCartIds: string[] = [this.shoppingId];
    const request: RequestDeliveryDTO = {
      shoppingCartId: shoppingCartIds,
    };
    this.shoppingCartService
      .postRequestDelivery(request)
      .subscribe(response => {
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: this.translate.instant('panierLivraison'),
          footer: 'footer',
        });
        localStorage.removeItem('BoxArticle');
        localStorage.removeItem('GameId');
        this.selectedArticleId = null;
        if (response.msg === '0 articles livrés') {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('erreurPageGame'),
            footer: 'footer',
          });
        }
      });
  }

  getOneUserBox() {
    this.gameService
      .getUserBox(this.id, {
        include: {
          box: {
            include: {
              boxType: true,
              boxImage: true,
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
            },
          },
        },
      })
      .subscribe(data => {
        this.cardBoxItem = this.getCardItemFormatted(data);
        const played = data.isPlayed;
        this.playedfix = `${played}`;
        this.boxDetail = data.box;
        // console.log('user box', data.isPlayed);
        this.boxArticle = data.box?.boxArticle as unknown as BoxArticleDTO[];
      });
  }

  getCardItemFormatted(boxPlay: UserBoxDTO): CardBoxItem {
    const playingImage = boxPlay.box?.boxImage.find(
      image => image.status === BoxStatus.PLAYING
    );
    const closedImage = boxPlay.box?.boxImage.find(
      image => image.status === BoxStatus.CLOSED
    );
    const openedImage = boxPlay.box?.boxImage.find(
      image => image.status === BoxStatus.OPENED
    );
    const otherImage = boxPlay.box?.boxImage.find(
      image => image.status === BoxStatus.OTHER
    );

    let imageUrlToShow = '';

    if (closedImage) {
      imageUrlToShow = closedImage.photoUrl;
    } else if (openedImage) {
      imageUrlToShow = openedImage.photoUrl;
    } else if (playingImage) {
      imageUrlToShow = playingImage.photoUrl;
    } else if (otherImage) {
      imageUrlToShow = otherImage.photoUrl;
    } else {
      imageUrlToShow = '';
    }

    return {
      id: boxPlay.box?.id,
      description: boxPlay.box?.description,
      title: String(boxPlay.box?.name),
      subTitle: String(boxPlay.box?.boxType.name),
      textLeft: String(boxPlay.box?.badge),
      textRight: String(boxPlay.box?.price) + '€',
      imageUrl: imageUrlToShow,
    };
  }

  getFormattedGameItems(): CardGameItem[] {
    return this.boxArticle.map(boxArticle => ({
      id: boxArticle?.article?.id,
      title: String(boxArticle?.winningChance) + '%',
      textLeftBotton: boxArticle?.article?.reference.substring(0, 6),
      textLeftTop: boxArticle?.article?.designation.substring(0, 6) + '...',
      // textRight: String(boxArticle?.article?.price?.currentPrice) + '',
      textRight: String(boxArticle?.article?.price?.currentPrice ?? 0),
      imageUrl: boxArticle.article.articlePhoto[0]?.photoUrl,
    }));
  }

  chooseRandomArticle() {
    const articleIds = this.boxArticle.map(item => item.article.id);
    const randomIndex = Math.floor(Math.random() * articleIds.length);
    return articleIds[randomIndex];
  }

  startScrollAnimation() {
    this.show = false;
    this.isAnimationRunning = true;
    this.animationInterval = setInterval(() => {
      const randomArticleId = this.chooseRandomArticle();
      this.selectedArticleId = randomArticleId;
      localStorage.setItem('BoxArticle', this.selectedArticleId);

      const selectedArticle = this.boxArticle.find(
        item => item.article.id === this.selectedArticleId
      );
      if (selectedArticle) {
        this.selectedArticleImageUrl =
          selectedArticle.article.articlePhoto[0]?.photoUrl;
      }
    }, 160);
  }

  stopScrollAnimation(articleId: any) {
    this.isAnimationRunning = false;
    this.selectedArticleId = articleId;
    const selectedArticle = this.boxArticle.find(
      item => item.article.id === this.selectedArticleId
    );
    if (selectedArticle) {
      this.selectedArticleImageUrl =
        selectedArticle.article.articlePhoto[0]?.photoUrl;
    }
    clearInterval(this.animationInterval);
  }

  startAnimationButtonClicked() {
    this.postGame();
    this.gameStarted = true;
  }

  postGame() {
    const newGame: GameDTO = { userBoxId: this.id };
    this.gameService.lanceGame(newGame).subscribe(
      response => {
        const gameId = response.id;
        // console.log('id game returne', gameId);
        this.GameIdReturn = `${gameId}`;
        localStorage.setItem('GameId', this.GameIdReturn);
        this.getOneGame();
      },
      error => {
        if (error.status === 201) {
          const errorMessage = error.error?.message[0] || 'Erreur inconnue';
        } else {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: 'Vous avez déjà joué ce box, veuillez effectuer un autre achat.',
            footer: 'footer',
          });
        }
      }
    );
  }
  shoppingPriceArticle: any;

  getOneGame() {
    const gameId = localStorage.getItem('GameId');
    if (gameId) {
      this.GameIdReturn = gameId;
      this.gameService
        .getOneGameUser(this.GameIdReturn, {
          include: {
            shoppingCart: true,
            userBox: true,
            article: { include: { price: true } },
          },
        })
        .subscribe(response => {
          const GameGlobalReturn = response;
          // console.log('Game returner', GameGlobalReturn);
          const status = response.status;
          this.gameStatus = `${status}`;
          if (response.status === 'RUNNING') {
            return this.startScrollAnimation();
          } else if (response.status === 'FINISHED') {
            const articleId = response.articleId;
            const shopping = response?.shoppingCart?.id;
            const shoppingPrice = response?.article?.price.currentPrice;
            if (shoppingPrice !== undefined) {
              const tenPercentOfPrice = shoppingPrice * 0.8995;
              const formattedPrice = tenPercentOfPrice.toFixed(2);
              this.shoppingPriceArticle = `${formattedPrice} €`;
            } else {
              this.shoppingPriceArticle = 'Prix non disponible';
            }
            const userBoIsPlayed = response.userBox?.isPlayed;
            this.shoppingId = `${shopping}`;
            this.userBoxIsPlayed = `${userBoIsPlayed}`;
            return this.stopScrollAnimation(articleId);
          }
        });
    }
  }

  goBack(): void {
    localStorage.removeItem('GameId');
    this.router.navigateByUrl(`/detail-box/${this.boxDetail?.id}`);
  }

  goToPanier(): void {
    localStorage.removeItem('GameId');
    this.router.navigateByUrl(`/panier`);
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
      'grid-template-rows': 'repeat(' + numberOfLines + ', 110px)',
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
}

export interface CardBoxItem {
  description?: string;
  titre?: string;
  imageUrl?: string;
  topTitle?: string;
  title: string;
  subTitle: string;
  textRight: string;
  textLeft: string;
  id?: string;
}
