import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carde-game-tride',
  templateUrl: './carde-game-tride.component.html',
  styleUrls: ['./carde-game-tride.component.scss'],
})
export class CardeGameTrideComponent {
  @Input()
  cardGameItem!: CardGameItem;
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;

  @Input()
  addBorder: boolean = false;

  getGameImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/image.jpeg';
    } else {
      return url;
    }
  }

  getCssCardClass(): string {
    const myClass = 'flex flex-col';
    return this.addBorder ? `${myClass} red-border` : myClass;
  }
}

export interface CardGameItem {
  id?: string;
  topTitle?: string;
  title: string;
  textRight: string;
  textLeftTop: string;
  textLeftBotton: string;
  imageUrl?: string;
}
