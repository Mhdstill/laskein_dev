import { Component, OnInit } from '@angular/core';
import { DropDownItem } from '../ui-tools/dropdown-menu/dropdown-menu.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../../store/user/index';
import { Observable } from 'rxjs';
import { ITransaction, IUser } from 'src/app/store/user/user.interface';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { NavigationEnd, Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { LanguageUtilityService } from 'src/app/services/utilities/language-utility.service';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<IUser>;
  user!: IUser;
  showMenu = false;
  transactions: ITransaction[] = [];
  selectedLanguage: string = 'en';

  constructor(
    private auth: AuthService,
    private readonly store: Store,
    private sharedDataService: SharedDataService,
    private router: Router,
    private walletService: WalletService,
    private utilityService: LanguageUtilityService,
    private shoppingCartService: ShoppingCartService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.sharedDataService
      .getProfileHeader()
      .subscribe((runUpdate: boolean) => {
        if (runUpdate) {
          this.getUserInfoFromStore();
          this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              window.scrollTo(0, 0);
            }
          });
        }
      });
    // Update user profile
    this.sharedDataService.getUserWallet().subscribe(data => {
      if (data !== null) {
        this.store.dispatch(fromUser.getUserById());
        this.getUserInfoFromStore();
      }
    });
    this.sharedDataService.getShoppingCart().subscribe(data => {
      if (data !== null) {
        this.store.dispatch(fromUser.getUserById());
        this.getUserInfoFromStore();
      }
    });
  }
  recompenseTitle: DropDownItem = {
    icon: 'fa fa-gift mr-2 !text-white',
    text: TRANSLATIONS['Recompense'],
  };

  recompenseItems: DropDownItem[] = [
    {
      icon: '',
      text: TRANSLATIONS['Recompense journaliere'],
      url: '/daily-reward',
    },
    {
      icon: '',
      text: TRANSLATIONS['Palier de recompense'],
      url: '/reward-level',
    },
    {
      icon: '',
      text: TRANSLATIONS['Parrainage'],
      url: '/sponsorship',
    },
  ];

  walletTitle: DropDownItem = {
    icon: '',
    text: TRANSLATIONS['Portefeuille'],
  };

  walletItems: DropDownItem[] = [
    {
      icon: 'fa fa-login text-white',
      text: TRANSLATIONS['Dépôt'],
      url: '/user-space',
    },
    {
      icon: '',
      text: TRANSLATIONS['Retrait'],
      url: '/user-space',
    },
  ];

  goToPortefeuil() {
    this.router.navigate(['/user-space'], { fragment: 'porte-feuille' });
  }

  showAlert() {
    alert(this.translate.instant('NotifMultiJoueur'));
  }

  getUserInfoFromStore() {
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(userById => {
      this.user = userById;
    });
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getProfileZoneWidth() {
    return 'width:' + (this.isLoggedIn() ? '250px' : '200px');
  }

  getMarginLeft() {
    return 'margin-left:' + (this.isLoggedIn() ? '100px' : '0px');
  }

  get1stCapitalizeName() {
    return (
      this.user?.firstName?.charAt(0)?.toUpperCase() +
      this.user?.lastName?.charAt(0)?.toUpperCase()
    );
  }
  getWallet() {
    return this.user?.wallet?.balance.toFixed(2);
  }

  getListShoppingCartCount() {
    const listeShoppingCart = this.user?.shoppingCart?.filter(
      isclaime => isclaime.isClaimed === false
    );
    if (listeShoppingCart) {
      return listeShoppingCart?.length;
    } else {
      return 0;
    }
  }

  getShortName() {
    return (
      this.user?.firstName?.split(' ')[0] +
      ' ' +
      this.user?.lastName?.split(' ')[0]
    );
  }

  updateLanguage(event: any) {
    this.utilityService.useLanguage(this.selectedLanguage);
  }
  //console.log(selectedLanguage);
}

export const TRANSLATIONS = {
  'Recompense journaliere': 'accueil.menu.recompense_journaliere',
  'Palier de recompense': 'accueil.menu.palier_de_recompense',
  Parrainage: 'accueil.menu.parrainage',
  Recompense: 'accueil.menu.recompense',
  Profil: 'accueil.menu.Profil',
  Déconnexion: 'accueil.menu.Déconnexion',
  Dépôt: 'accueil.menu.Dépôt',
  Retrait: 'accueil.menu.Retrait',
  Portefeuille: 'accueil.menu.porte_feuille',
};

// icon: "fa fa-arrow-right-from-bracket text-white"
