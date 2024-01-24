import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-gros-lot',
  templateUrl: './card-gros-lot.component.html',
  styleUrls: ['./card-gros-lot.component.scss'],
})
export class CardGrosLotComponent {
  @Input()
  cardGrosLotItem!: CardGrosLotItem;
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;

  getGrosLotImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
}

export interface CardGrosLotItem {
  id?: string;
  imageUrl?: string;
  prix?: string;
}
