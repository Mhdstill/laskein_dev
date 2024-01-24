import { Component, Input, OnInit } from '@angular/core';
import { CardBoxItem } from '../card-box/card-box.component';
import * as fromBox from '../../store/box/index';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoxStatus, IBox } from 'src/app/store/box/box.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/services/box/box.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss'],
})
export class BestSellersComponent implements OnInit {
  @Input()
  boxList: any[] = [];

  @Input()
  cardBoxItem!: CardBoxItem;

  allBox$!: Observable<IBox[]>;
  isLoading$!: Observable<boolean>;
  listBestSelledBox: CardBoxItem[] = [];
  boxDetails: IBox | null = null;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store,
    private router: Router,
    private boxService: BoxService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.setUp();
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  setUp() {
    this.allBox$ = this.store.pipe(select(fromBox.selectBoxList));
    this.isLoading$ = this.store.pipe(select(fromBox.selectBoxIsLoading));
    this.allBox$.subscribe(boxList => {
      this.listBestSelledBox = boxList
        .filter((box: IBox) => box.boxParams?.isBestSelling === true)
        .map((box: IBox) => {
          const closedImage = box.boxImage.find(
            image => image.status === BoxStatus.CLOSED
          );
          const openedImage = box.boxImage.find(
            image => image.status === BoxStatus.OPENED
          );
          const playingImage = box.boxImage.find(
            image => image.status === BoxStatus.PLAYING
          );
          const otherImage = box.boxImage.find(
            image => image.status === BoxStatus.OTHER
          );
          let imageUrlToShow = '';

          if (closedImage) {
            imageUrlToShow = closedImage.photoUrl;
          } else if (openedImage) {
            imageUrlToShow = openedImage.photoUrl;
          } else if (playingImage) {
            imageUrlToShow = playingImage.photoUrl;
          } else if (otherImage) {
            imageUrlToShow = otherImage.photoUrl;
          } else {
            imageUrlToShow = '';
          }
          return {
            id: box.id,
            title: box.name.substring(0, 20),
            subTitle: box.boxType.name,
            textLeft: box.badge,
            textRight: String(box.price) + '€',
            imageUrl: imageUrlToShow,
          };
        });
    });
  }
}
