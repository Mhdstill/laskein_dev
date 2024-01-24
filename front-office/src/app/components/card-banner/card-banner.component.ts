import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-banner',
  templateUrl: './card-banner.component.html',
  styleUrls: ['./card-banner.component.scss'],
})
export class CardBannerComponent {
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;

  @Input() images: carouselImage[] = [];

  getBannerImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
}

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
  bannerLink?: string;
}
