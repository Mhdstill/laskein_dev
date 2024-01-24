import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-level-box',
  templateUrl: './reward-level-box.component.html',
  styleUrls: ['./reward-level-box.component.scss'],
})
export class RewardLevelBoxComponent {
  @Input()
  cardRewardLevelItem!: CardRewardLevelItem;

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

export interface CardRewardLevelItem {
  topTitle?: string;
  xValue?: string;
  imageUrl?: string;
}
