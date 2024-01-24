import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-blog',
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.scss'],
})
export class CardBlogComponent {
  @Input()
  cardBlogItem!: CardBlogItem;
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;

  getBlogImageURL(url: string): string {
    if (url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }
}

export interface CardBlogItem {
  lien: string;
  title: string;
  description: string;
  imageUrl?: string;
  id?: string;
}
