import { Component, Input } from '@angular/core';
import { DropDownItem } from '../ui-tools/dropdown-menu/dropdown-menu.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss'],
})
export class ProfileDropdownComponent {
  @Input()
  shortName: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService,
    private translate: TranslateService
  ) {}

  profileItems: DropDownItem[] = [
    {
      icon: 'fa fa-login text-white',
      text: TRANSLATIONS['Profil'],
      url: '/user-space',
    },
    {
      icon: 'fa fa-sign-out',
      text: TRANSLATIONS['Deconnexion'],
    },
  ];

  profileTitle: DropDownItem = {
    icon: '',
    text: '',
  };

  // onLogout(textOption: any) {
  //   console.log('teste', textOption);
  //   if (textOption === 'Deconnexion') {
  //     this.auth.logout();
  //   }
  // }

  onLogout(textOption: any) {
    if (textOption === 'Deconnexion') {
      // const currentUrl = this.router.url;
      this.auth.logout();
      this.alertService.showAlert('SUCCESS', {
        header: 'Info',
        body: this.translate.instant('déconnecte'),
      });
      // this.router.navigateByUrl(currentUrl);
      this.router.navigateByUrl('/');
    }
  }
}

export const TRANSLATIONS = {
  Profil: 'accueil.menu.Profil',
  Deconnexion: 'Deconnexion',
};
