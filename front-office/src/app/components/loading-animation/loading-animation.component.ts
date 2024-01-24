import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingAnimationService } from 'src/app/services/loading-animation/loading-animation.service';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.scss'],
})
export class LoadingAnimationComponent implements OnInit {
  show: boolean = false;

  constructor(private las: LoadingAnimationService) {}

  ngOnInit(): void {
    this.las.loading.subscribe((show: boolean) => {
      this.show = show;
    });
  }
}
