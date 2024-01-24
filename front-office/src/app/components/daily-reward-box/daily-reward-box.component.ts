import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-daily-reward-box',
  templateUrl: './daily-reward-box.component.html',
  styleUrls: ['./daily-reward-box.component.scss'],
})
export class DailyRewardBoxComponent {
  @Input()
  cardBoxItem!: CardBoxItem;
  protected readonly top = top;

  @Input()
  isSmall: boolean = false;
}

export interface CardBoxItem {
  topTitle?: string;
  title: string;
  subTitle: string;
  textRight: string;
  textLeft: string;
}
