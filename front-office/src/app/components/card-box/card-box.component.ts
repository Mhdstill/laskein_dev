import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-box',
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss'],
})
export class CardBoxComponent {
  @Input()
  cardBoxItem!: CardBoxItem;
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;

  getBoxImageURL(url: string): string {
    if (url.includes('upload-file')) {
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
  fournisseurId?: string;
}
