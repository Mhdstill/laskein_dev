import { Component } from '@angular/core';
import { CardBoxItem } from 'src/app/components/card-box/card-box.component';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.scss'],
})
export class UserSpaceComponent {
  menuKeys = [
    'account',
    'tracking-order',
    'subscription-management',
    'palier',
    'refereral',
  ];
  menuList = [
    { key: this.menuKeys[0], value: TRANSLATIONS['Mon compte'] },
    { key: this.menuKeys[1], value: TRANSLATIONS['Commande et Suivi'] },
    { key: this.menuKeys[2], value: TRANSLATIONS['Gere votre abonnement'] },
    { key: this.menuKeys[3], value: TRANSLATIONS['Palier de recompense'] },
    { key: this.menuKeys[4], value: TRANSLATIONS['Parrainage'] },
  ];

  cardBoxItem: CardBoxItem = {
    title: 'box name',
    subTitle: 'pour homme',
    textLeft: 'Game',
    textRight: '50€',
  };
  getBoxList(): any[] {
    return Array.from({ length: 26 }, () => null);
  }
  activeTab = this.menuKeys[0];

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  getBgColorActiveTab(activeTab: string) {
    return this.activeTab === activeTab
      ? 'background-color : #2f435e !important ; border-radius: 10px 10px 0px 0px'
      : '';
  }
}

export const TRANSLATIONS = {
  'Mon compte': 'tab.Mon_compte',
  'Commande et Suivi': 'tab.Commande_et_suivie',
  'Gere votre abonnement': 'tab.Gérer_votre_abonnement',
  'Palier de recompense': 'tab.Palier_de_récompense',
  Parrainage: 'tab.parrainage',
};
