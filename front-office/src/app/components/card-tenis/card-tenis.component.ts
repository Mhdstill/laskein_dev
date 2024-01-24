import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-tenis',
  templateUrl: './card-tenis.component.html',
  styleUrls: ['./card-tenis.component.scss'],
})
export class CardTenisComponent {
  @Input()
  cardTenisItem!: CardTenisItem;
  protected readonly top = top;

  showTextTop = false;
  isItemDetailsShown: boolean = false;

  toggleTextTopVisibility() {
    this.showTextTop = !this.showTextTop;
    console.log('test');
  }

  @Input()
  isSmall: boolean = false;

  getTenisImageURL(url: string): string {
    // if (url.includes('upload-file')) {
    if (url && url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/image.jpeg';
    } else {
      return url;
    }
  }

  toogleItemDetails() {
    this.isItemDetailsShown = !this.isItemDetailsShown;
    console.log('show it: ' + this.isItemDetailsShown);
  }
}

export interface CardTenisItem {
  id?: string;
  topTitle?: string;
  title: string;
  textRight: string;
  textLeftTop: string;
  textTop: string;
  imageUrl: string;
  observation: string;
}
