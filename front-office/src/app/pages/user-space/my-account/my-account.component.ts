import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  activeTab: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.activeTab = fragment || this.menuKeys[0];
    });
  }
  menuKeys = ['profil', 'porte-feuille', 'adresse', 'compte', 'status'];
  menuList = [
    { key: this.menuKeys[0], value: TRANSLATIONS['Profil'] },
    { key: this.menuKeys[1], value: TRANSLATIONS['Porte feuille'] },
    { key: this.menuKeys[2], value: TRANSLATIONS['Mon adresse'] },
    { key: this.menuKeys[3], value: TRANSLATIONS['Compte'] },
    { key: this.menuKeys[4], value: TRANSLATIONS['Status'] },
  ];

  changeTab(tabKey: string) {
    this.activeTab = tabKey;
    this.router.navigate(['/user-space'], { fragment: tabKey });
  }

  getBgColorActiveTab(activeTab: string) {
    return this.activeTab === activeTab
      ? 'background-color : #6e485d !important'
      : '';
  }

  getIconClass(key: string): string {
    if (key === 'profil') {
      return 'fas fa-user';
    } else if (key === 'porte-feuille') {
      return 'fas fa-wallet';
    } else if (key === 'adresse') {
      return 'fas fa-map';
    } else if (key === 'compte') {
      return 'fa-regular fa-address-card';
    } else if (key === 'status') {
      return 'fa-solid fa-circle-info';
    } else {
      return '';
    }
  }
}

export const TRANSLATIONS = {
  Profil: 'tab.Profil',
  'Porte feuille': 'tab.Portefeuille',
  'Mon adresse': 'tab.Mon_adresse',
  Compte: 'tab.Compte',
  Status: 'tab.StatusCompte',
};
