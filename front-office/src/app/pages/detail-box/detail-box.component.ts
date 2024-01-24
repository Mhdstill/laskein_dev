import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CardBoxItem } from 'src/app/components/card-box/card-box.component';
import { CardTenisItem } from 'src/app/components/card-tenis/card-tenis.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoxService } from 'src/app/services/box/box.service';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import {
  BoxArticleDTO,
  BoxStatus,
  IBox,
  PurchaseDTO,
  UserBoxDTO,
} from 'src/app/store/box/box.interface';

@Component({
  selector: 'app-detail-box',
  templateUrl: './detail-box.component.html',
  styleUrls: ['./detail-box.component.scss'],
})
export class DetailBoxComponent implements OnInit {
  showPorteFeuilleTab: boolean = false;
  isLoading: boolean = true;
  showModal: boolean = false;

  cardBoxItem!: CardBoxItem;
  cardTenisItem!: CardTenisItem;

  boxDetails: IBox | undefined;
  boxArticle: BoxArticleDTO[] = [];

  id: any;
  userId: any;
  UserMe: any;
  formattedTennisItems: CardTenisItem[] = [];

  goBack(): void {
    this.router.navigateByUrl('store');
  }
  goToGame(): void {
    this.router.navigateByUrl('game');
  }

  getTenisList(): any[] {
    return Array.from({ length: 26 }, () => null);
  }

  getBoxListRigt(): any[] {
    return Array.from({ length: 26 }, () => null);
  }

  // eslint-disable-next-line no-unused-vars
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boxService: BoxService,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // console.log('this.id =', this.id);
    this.getBoxDetails();
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.getUser();
    }
  }

  getUser() {
    const userId = this.authService.getUserId();
    this.shoppingCartService
      .getUser(userId, {
        include: {
          address: true,
        },
      })
      .subscribe(response => {
        this.UserMe = response.emailIsVerified;
        this.userId = response.id;
      });
  }

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
        // console.log('liste data', data.boxArticle);
        this.cardBoxItem = this.getCardItemFormatted(data);
        this.boxArticle = data.boxArticle;
        this.boxDetails = data;
        this.getFormattedTenisItems();
      });
  }

  getFormattedTenisItems(): void {
    this.formattedTennisItems = this.boxArticle.map(boxArticle => ({
      title: String(boxArticle?.winningChance) + '%',
      textLeftTop: boxArticle?.article?.designation.substring(0, 10) + '...',
      textTop: boxArticle?.article?.designation,
      observation: boxArticle?.article?.observation,
      textRight: String(boxArticle?.article?.price?.currentPrice ?? 0) + '€',
      imageUrl: boxArticle?.article?.articlePhoto[0]?.photoUrl || '',
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

    if (openedImage) {
      imageUrlToShow = openedImage.photoUrl;
    } else if (closedImage) {
      imageUrlToShow = closedImage.photoUrl;
    } else if (playingImage) {
      imageUrlToShow = playingImage.photoUrl;
    } else if (otherImage) {
      imageUrlToShow = otherImage.photoUrl;
    } else {
      imageUrlToShow = '';
    }
    return {
      id: box.id,
      description: box.description,
      titre: box.name,
      title: box.name,
      subTitle: box.boxType.name,
      textLeft: box.badge,
      textRight: String(box.price) + '€',
      imageUrl: imageUrlToShow,
    };
  }

  goTo() {
    this.router.navigateByUrl('auth');
  }

  achatBox(): void {
    const purchase: PurchaseDTO = {
      boxId: this.boxDetails?.id || '',
    };
    if (this.UserMe === true) {
      this.boxService.achatBox(purchase).subscribe(achat => {
        if (achat.message === 'Your balance is insufficient') {
          this.router.navigate(['/user-space'], { fragment: 'porte-feuille' });
        } else {
          localStorage.removeItem('GameId');
          localStorage.removeItem('BoxArticle');
          this.boxService
            .getUserBox({
              where: { userId: this.authService.getUserId() },
              include: {
                box: true,
              },
            })
            .subscribe(data => {
              const userBox: UserBoxDTO[] = Object.values(data).filter(
                userboxes =>
                  userboxes.type === 'PURCHASE' && userboxes.isPlayed === false
              );

              const userBoxIdForBoxSelected = userBox.find(
                (userBoxs: UserBoxDTO) => {
                  return userBoxs.boxId === this.id;
                }
              );
              this.router.navigateByUrl(`/game/${userBoxIdForBoxSelected?.id}`);
            });
        }
      });
    } else {
      this.alertService.showAlert('ERROR', {
        header: 'Erreur',
        body: this.translate.instant('textNotifPourActiveCompte'),
      });
    }
  }

  goToGameTried(): void {
    localStorage.removeItem('GameId');
    this.router.navigateByUrl(`/game-tried/${this.boxDetails?.id}`);
  }

  getGridLayoutStyle(sizeList: number) {
    let numberOfLines = sizeList / 4;
    numberOfLines = Math.ceil(numberOfLines);
    // console.log('numberOfLines = ', numberOfLines);
    return {
      'grid-template-rows': 'repeat(' + numberOfLines + ', 230px)',
    };
  }
}
