import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardBoxItem } from 'src/app/components/card-box/card-box.component';
import { TableItem } from 'src/app/components/custom-table-panier/custom-table-panier.component';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  IAddress,
  RequestDeliveryDTO,
  RequestExchangeDTO,
  ShoppingCartDTO,
  ShoppingCartService,
} from 'src/app/services/shoppingCart/shopping-cart.service';
import { IUser } from 'src/app/store/user/user.interface';
import { environment } from 'src/environments/environment';
import * as fromUser from '../../store/user/index';
import { UserService } from 'src/app/services/user/user.service';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { BaseComponent } from '../base-page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent extends BaseComponent implements OnInit {
  constructor(
    private router: Router,
    private readonly store: Store,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private alertService: AlertService,
    private userService: UserService,
    public override inputErrorService: InputErrorService,
    private translate: TranslateService
  ) {
    super(inputErrorService);
  }

  ngOnInit(): void {
    this.getAllShoppingCart();
    this.getUser();
    this.setUp();
    this.sharedDataService.getShoppingCart().subscribe(data => {
      if (data !== null) {
        // refresh ShoppingCart
        this.getAllShoppingCart();
      }
    });
    this.sharedDataService.getProfileHeader().subscribe(data => {
      if (data !== null) {
        // refresh ShoppingCart
        this.getUser();
      }
    });
  }

  userAddress$!: Observable<IAddress>;
  userAddress!: IAddress;

  user$!: Observable<IUser>;
  user!: IUser;
  cardBoxItem: CardBoxItem = {
    title: 'box name',
    subTitle: 'pour homme',
    textLeft: 'Game',
    textRight: '50€',
  };
  showModalVendre: boolean = false;
  showModalLivraison: boolean = false;
  showModalEditLivraison: boolean = false;
  listShoppingCart: ShoppingCartDTO[] = [];
  tableRows: TableItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  selectAllChecked: boolean = false;
  selectOne: boolean = false;
  oneShoppingCartId: any;
  allShoppingCartId: any;
  UserMe: any;

  titles = [
    'panier.Photo',
    'panier.Désignation',
    'panier.Prix',
    'panier.Description',
  ];

  setUp() {
    this.adresseForm.disable();

    // Get it from user store
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(userById => {
      this.userAddress = userById.address;
      this.initializeUserForm();
    });
  }

  getUpdatedAddress() {
    this.adresseForm.disable();
    this.userService.getUserAddress().subscribe(address => {
      this.userAddress = address[0] as IAddress;
      this.initializeUserForm();
      this.store.dispatch(fromUser.getUserById());
    });
  }

  adresseForm: FormGroup = new FormGroup({
    adresse1: new FormControl('', Validators.required),
    adresse2: new FormControl('', Validators.required),
    codePostale: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    autreInformation: new FormControl(''),
  });

  initializeUserForm() {
    if (this.userAddress) {
      this.adresseForm.controls['adresse1'].setValue(
        this.userAddress.firstAdress
      );
      this.adresseForm.controls['adresse2'].setValue(
        this.userAddress.secondAdress
      );
      this.adresseForm.controls['codePostale'].setValue(
        this.userAddress.zipCode
      );
      this.adresseForm.controls['ville'].setValue(this.userAddress.city);
      this.adresseForm.controls['region'].setValue(this.userAddress.region);
      this.adresseForm.controls['pays'].setValue(this.userAddress.country);
      this.adresseForm.controls['autreInformation'].setValue(
        this.userAddress.additionnalInformation
      );
    }
  }

  updateUserInfo() {
    // Create a new object with updated gender
    super.submitButtonClicked();
    if (this.adresseForm.valid) {
      if (this.userAddress) {
        // Update
        const userAddress: IAddress = {
          ...this.userAddress,
          firstAdress: this.adresseForm.controls['adresse1'].value,
          secondAdress: this.adresseForm.controls['adresse2'].value,
          city: this.adresseForm.controls['ville'].value,
          zipCode: this.adresseForm.controls['codePostale'].value,
          region: this.adresseForm.controls['region'].value,
          country: this.adresseForm.controls['pays'].value,
          additionnalInformation:
            this.adresseForm.controls['autreInformation'].value,
        };
        this.userService
          .updateUserAddress(
            userAddress.id,
            this.getNewAddressForServer(userAddress)
          )
          .subscribe(address => {
            this.refreshUserAddress(address);
          });
      } else {
        // Create
        const userAddress: IAddress = {
          firstAdress: this.adresseForm.controls['adresse1'].value,
          secondAdress: this.adresseForm.controls['adresse2'].value,
          city: this.adresseForm.controls['ville'].value,
          zipCode: this.adresseForm.controls['codePostale'].value,
          region: this.adresseForm.controls['region'].value,
          country: this.adresseForm.controls['pays'].value,
          additionnalInformation:
            this.adresseForm.controls['autreInformation'].value,
          id: '',
          userId: '',
        };
        this.userService
          .createUserAddress(this.getNewAddressForServer(userAddress))
          .subscribe(address => {
            this.refreshUserAddress(address);
          });
      }
    }
    this.showModalEditLivraison = false;
  }

  private refreshUserAddress(address: IAddress) {
    this.userAddress = address;
    this.updateSuccessAlert();
    this.getUpdatedAddress();
  }

  submitForm() {}

  handleEnablingForm() {
    if (this.adresseForm.disabled) {
      this.adresseForm.enable();
    } else {
      this.adresseForm.disable();
    }
    this.showModalEditLivraison = true;
    this.showModalVendre = false;
    this.showModalLivraison = false;
  }

  updateSuccessAlert() {
    this.alertService.showAlert('SUCCESS', {
      header: 'Info',
      body: this.translate.instant('updateInformation'),
    });
  }

  getNewAddressForServer(address: IAddress): any {
    return {
      firstAdress: address.firstAdress,
      secondAdress: address.secondAdress,
      zipCode: address.zipCode,
      city: address.city,
      region: address.region,
      country: address.country,
      additionnalInformation: address.additionnalInformation,
      userId: address.userId,
    };
  }

  closeModal() {
    this.showModalLivraison = false;
    this.showModalVendre = false;
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  selectedShoppingCartIds: string[] = [];

  // selectAllCheckboxChanged() {
  //   this.selectedShoppingCartIds = [];
  //   console.log('liste article selectionner', this.selectedShoppingCartIds);
  //   for (const data of this.listShoppingCart) {
  //     data.isSelected = this.selectAllChecked;
  //     if (data.isSelected) {
  //       this.selectedShoppingCartIds.push(data.id);
  //     }
  //   }
  //   this.allShoppingCartId = this.selectedShoppingCartIds.join(', ');
  // }

  totalSelectedPrice: any;
  totalSelectedPriceFormatted: any;

  selectAllCheckboxChanged() {
    this.selectedShoppingCartIds = [];
    this.totalSelectedPrice = 0;

    for (const data of this.listShoppingCart) {
      data.isSelected = this.selectAllChecked;

      if (data.isSelected) {
        this.selectedShoppingCartIds.push(data.id);

        const articlePrice = data.game?.article?.price.currentPrice || 0;
        this.totalSelectedPrice += articlePrice * 0.8995;
      }
    }

    this.totalSelectedPriceFormatted = this.totalSelectedPrice.toFixed(2);
    this.allShoppingCartId = this.selectedShoppingCartIds.join(', ');
  }

  selectedCartIds: string[] = [];

  // individualCheckboxChanged(clickedCart: any, isChecked: boolean) {
  //   clickedCart.isSelected = isChecked;
  //   const cartId = clickedCart.id.toString();
  //   if (isChecked) {
  //     this.selectedCartIds.push(cartId);
  //     const test = this.selectedCartIds;
  //     this.oneShoppingCartId = `${test}`;
  //   } else {
  //     const index = this.selectedCartIds.indexOf(cartId);
  //     if (index !== -1) {
  //       this.selectedCartIds.splice(index, 1);
  //     }
  //   }
  // }

  individualCheckboxChanged(clickedCart: any, isChecked: boolean) {
    clickedCart.isSelected = isChecked;
    const cartId = clickedCart.id.toString();

    if (isChecked) {
      this.selectedCartIds.push(cartId);
    } else {
      const index = this.selectedCartIds.indexOf(cartId);
      if (index !== -1) {
        this.selectedCartIds.splice(index, 1);
      }
    }

    this.calculateTotalPriceSelected();
  }

  calculateTotalPriceSelected() {
    this.totalSelectedPrice = 0;

    for (const cartId of this.selectedCartIds) {
      const selectedCart = this.listShoppingCart.find(
        cart => cart.id.toString() === cartId
      );
      if (selectedCart) {
        const articlePrice =
          selectedCart.game?.article?.price.currentPrice || 0;
        this.totalSelectedPrice += articlePrice * 0.8995;
      }
    }

    this.totalSelectedPriceFormatted = this.totalSelectedPrice.toFixed(2);
  }

  getPostLivre() {
    let shoppingCartIds: string[] = [];

    if (this.selectAllChecked) {
      shoppingCartIds = this.selectedShoppingCartIds.map(id => id.toString());
    } else if (this.selectedCartIds.length > 0) {
      shoppingCartIds = this.selectedCartIds.map(id => id.toString());
    } else {
      shoppingCartIds = [this.oneShoppingCartId];
    }

    if (shoppingCartIds.length === 0) {
      return;
    }

    const request: RequestDeliveryDTO = {
      shoppingCartId: shoppingCartIds,
    };

    this.shoppingCartService.postRequestDelivery(request).subscribe(
      response => {
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: this.translate.instant('panierLivraison'),
        });
        this.getAllShoppingCart();
        this.selectedCartIds = [];
        this.selectedShoppingCartIds = [];
      },
      error => {
        if (error.status === 400) {
          const errorMessage = error.error?.message[0] || 'Erreur inconnue';
          if (
            errorMessage === 'each value in shoppingCartId must be a mongodb id'
          ) {
            this.alertService.showAlert('ERROR', {
              header: 'Info',
              body: this.translate.instant('erreurPanier'),
            });
          } else {
            this.alertService.showAlert('ERROR', {
              header: 'Erreur',
              body: errorMessage,
            });
            this.translate.instant('erreurPanier');
          }
        } else {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('erreurPanier'),
          });
        }
      }
    );
  }

  getPostVendre() {
    let shoppingCartIds: string[] = [];
    if (this.selectAllChecked) {
      shoppingCartIds = this.selectedShoppingCartIds.map(id => id.toString());
    } else if (this.selectedCartIds.length > 0) {
      shoppingCartIds = this.selectedCartIds.map(id => id.toString());
    } else {
      shoppingCartIds = [this.oneShoppingCartId];
    }
    if (shoppingCartIds.length === 0) {
      return;
    }
    const request: RequestExchangeDTO = {
      shoppingCartId: shoppingCartIds,
    };
    this.shoppingCartService.postRequestExchange(request).subscribe(
      response => {
        this.alertService.showAlert('SUCCESS', {
          header: 'Info',
          body: this.translate.instant('panierVendre'),
        });
        this.getAllShoppingCart();
        this.selectedCartIds = [];
        this.selectedShoppingCartIds = [];
      },
      error => {
        if (error.status === 400) {
          const errorMessage = error.error?.message[0] || 'Erreur inconnue';
          if (
            errorMessage === 'each value in shoppingCartId must be a mongodb id'
          ) {
            this.alertService.showAlert('ERROR', {
              header: 'Info',
              body: this.translate.instant('erreurPanier'),
            });
          } else {
            this.alertService.showAlert('ERROR', {
              header: 'Erreur',
              body: errorMessage,
            });
          }
        } else {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('erreurPanier'),
          });
        }
        this.getAllShoppingCart();
      }
    );
  }
  // this.calculatedPrice = data.game.article.price.currentPrice * 0.9;

  calculateTotalPrice(): number {
    let totalPrice = 0;

    for (const data of this.listShoppingCart) {
      totalPrice += data.game.article.price.currentPrice;
    }

    return totalPrice;
  }

  calculateUpperLimit() {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.listShoppingCart.length
    );
  }

  getAllShoppingCart() {
    this.shoppingCartService
      .getAllShoppingCart({
        where: {
          isClaimed: false,
          userId: this.authService.getUserId(),
        },

        include: {
          game: {
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
      })
      .subscribe(data => {
        this.listShoppingCart = data;
      });
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
        this.UserMe = response;
      });
  }

  getBoxImageURL(url: string): string {
    // if (url.includes('upload-file')) {
    if (url && url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }

  getBoxList(): any[] {
    return Array.from({ length: 26 }, () => null);
  }

  getBoxListRigt(): any[] {
    return Array.from({ length: 5 }, () => null);
  }
  goDetailBox() {
    this.router.navigateByUrl('detail-box');
  }
  goToStore() {
    this.router.navigateByUrl('store');
  }

  getGridLayoutStyle() {
    let numberOfLines = this.getBoxList().length / 4;
    numberOfLines = Math.ceil(numberOfLines);
    console.log('numberOfLines = ', numberOfLines);
    return {
      'grid-template-rows': 'repeat(' + numberOfLines + ', 280px)',
    };
  }
}

export const TRANSLATIONS = {
  'Pallier réçu': 'palier.palier_reçu',
  'Pallier débloqué': 'palier.palier_débloque',
  'Pallier en cours': 'palier.palier_en_cours',
  'Pallier non débloqué': 'palier.palier_non_débloqué',
};
