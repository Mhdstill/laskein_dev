import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-provider',
  templateUrl: './card-provider.component.html',
  styleUrls: ['./card-provider.component.scss'],
})
export class CardProviderComponent {
  @Input()
  cardProviderItem!: CardProviderItem;
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;

  getProviderImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
}

export interface CardProviderItem {
  imageUrl?: string;
  id?: string;
  onClick: () => void;
}
