import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DropDownItem } from '../../components/ui-tools/dropdown-menu/dropdown-menu.component';
import {
  diversList,
  diversTitle,
  gameList,
  gameTitle,
  hightechList,
  highTechTitle,
  lifeStyleList,
  lifeStyleTitle,
  modeList,
  modeTitle,
  multiCategorieTitle,
} from './store-data';
import { CardBoxItem } from '../../components/card-box/card-box.component';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  BoxStatus,
  IBox,
  StoreBoxFiltering,
} from 'src/app/store/box/box.interface';
import { Store, select } from '@ngrx/store';
import * as fromBox from '../../store/box/index';
import { CategoryService } from 'src/app/services/category/category.service';
import { ICategory } from 'src/app/store/user/user.interface';
import {
  FournisseurService,
  ProviderDTO1,
} from 'src/app/services/fournisseur/fournisseur.service';
import { BoxService } from 'src/app/services/box/box.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  allBox$!: Observable<IBox[]>;
  allBoxSync!: IBox[];
  isLoading$!: Observable<boolean>;
  listBox: CardBoxItem[] = [];
  filteredListBox: CardBoxItem[] = [];
  buttonWidth = 240;

  modeTitle = modeTitle;
  modeList: DropDownItem[] = modeList;
  highTechTitle: DropDownItem = highTechTitle;
  hightechList: DropDownItem[] = hightechList;
  lifeStyleTitle: DropDownItem = lifeStyleTitle;
  lifeStyleList: DropDownItem[] = lifeStyleList;
  diversTitle: DropDownItem = diversTitle;
  diversList: DropDownItem[] = diversList;
  gameTitle: DropDownItem = gameTitle;
  gameList: DropDownItem[] = gameList;
  selectedCategoryId!: any;

  multiCategorieTitle: DropDownItem = multiCategorieTitle;
  selectedStoreBoxFiltering!: StoreBoxFiltering;
  selectedStoreBoxFilteringParams: any;
  filterInputContent!: string;
  showModal: boolean = false;
  showTooltip: boolean = false;
  categoryList: ICategory[] = [];
  dropDownDataList: DropDownData[] = [];

  allBoxIdsFromSubCategory: string[] = [];
  cardBoxItem: CardBoxItem = {
    title: 'box name',
    subTitle: 'pour homme',
    textLeft: 'Game',
    textRight: '50€',
  };
  fournisseurList: ProviderDTO1[] = [];

  @ViewChild('topContainer') scrollContainer!: ElementRef;
  providerId!: string;

  @ViewChild('scrollableDivBoxFilter') scrollableDivBoxFilter!: ElementRef;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private readonly store: Store,
    private fournisseurService: FournisseurService,
    private boxService: BoxService
  ) {}
  testF: any;
  ngOnInit() {
    this.fournisseurService.getSelectedProviderId().subscribe(providerId => {
      if (providerId) {
        this.providerId = providerId;
      }
      this.initSubscriptions();
      this.setup();
    });
  }

  filterByProvider() {
    this.allBoxSync = this.filterArrayByProviderId(
      this.allBoxSync,
      this.providerId
    );
  }

  filterArrayByProviderId(inputArray: any[], providerId: string) {
    return inputArray?.filter(item => {
      return item?.boxArticle?.some(
        (article: any) => article?.article?.providerId === providerId
      );
    });
  }

  setup() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categoryList = data;
      this.dropDownDataList = this.categoryList.map(categ => {
        const title = {
          id: categ.id,
          icon: '',
          text: categ.name,
        };
        const list = categ.subCategory.map(subCateg => {
          const boxArticleList = subCateg.article.map(
            (art: any) => art?.boxArticle
          );
          const boxIdList = boxArticleList
            .flatMap(articleList => articleList)
            .map(article => article?.boxId);
          return {
            icon: '',
            text: subCateg.name,
            list: boxIdList,
          };
        });
        return {
          title,
          list,
        };
      });
    });
  }

  private async initSubscriptions(): Promise<void> {
    this.allBox$ = this.store.pipe(select(fromBox.selectBoxList));
    this.isLoading$ = this.store.pipe(select(fromBox.selectBoxIsLoading));
    this.allBox$.subscribe(boxList => {
      this.allBoxSync = boxList;
      if (this.providerId) {
        this.filterByProvider();
      }
      this.listBox = this.allBoxSync.map((box: IBox) => {
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
      this.filteredListBox = this.listBox;

      // réinitialis le scroll
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    });
  }

  getCardItemFormatted(boxList: IBox[]): CardBoxItem[] {
    return boxList.map(box => {
      return {
        id: box.id,
        title: box.name.substring(0, 10) + '...',
        subTitle: box.boxType.name,
        textLeft: box.badge,
        textRight: String(box.price) + '$',
        imageUrl: box.boxImage[0]?.photoUrl,
      };
    });
  }

  mapBoxToCardItem(box: IBox): CardBoxItem {
    return {
      title: box.name.substring(0, 10) + '...',
      subTitle: box.boxType.id,
      textLeft: box.badge,
      textRight: String(box.price),
      imageUrl: box.boxImage[0]?.photoUrl,
    };
  }

  getBoxList(): any[] {
    return Array.from({ length: 26 }, () => null);
  }

  getBoxListRigt(): any[] {
    return Array.from({ length: 5 }, () => null);
  }

  goDetailBox() {
    this.router.navigateByUrl('detail-box');
  }

  getGridLayoutStyle(sizeList: number) {
    let numberOfLines = sizeList / 4;
    numberOfLines = Math.ceil(numberOfLines);
    return {
      'grid-template-rows': 'repeat(' + numberOfLines + ', 280px)',
    };
  }

  filterBoxList(event: any) {
    const { filterBy, params } = event;

    if (filterBy !== StoreBoxFiltering.BY_NAME) {
      this.selectedStoreBoxFiltering = filterBy;
      this.selectedStoreBoxFilteringParams = params;
    }
    switch (filterBy) {
      case StoreBoxFiltering.BY_NAME:
        this.filterInputContent = params;
        this.filterByBoxName();
        break;
      case StoreBoxFiltering.PRICE_ASCENDING:
        const filteredBoxAscending = this.allBoxSync
          .slice()
          .sort((box1, box2) => {
            return box1.price - box2.price;
          });
        this.filteredListBox = this.getCardItemFormatted(filteredBoxAscending);
        break;
      case StoreBoxFiltering.PRICE_DESCENDING:
        const filteredBoxDescending = this.allBoxSync
          .slice()
          .sort((box1, box2) => {
            return box2.price - box1.price;
          });
        this.filteredListBox = this.getCardItemFormatted(filteredBoxDescending);
        break;
      case StoreBoxFiltering.GREATER_THAN_X_PRICE:
        const filteredBoxGreatThanXPrice = this.allBoxSync.filter(
          box => box.price > +params
        );
        this.filteredListBox = this.getCardItemFormatted(
          filteredBoxGreatThanXPrice
        );
        break;
      case StoreBoxFiltering.LESS_THAN_X_PRICE:
        const filteredBoxLowerThanXPrice = this.allBoxSync.filter(
          box => box.price < +params
        );
        this.filteredListBox = this.getCardItemFormatted(
          filteredBoxLowerThanXPrice
        );
        break;
      case StoreBoxFiltering.PRICE_INTERVAL:
        const filteredBoxInInterval = this.allBoxSync.filter(
          box =>
            box.price >= +params?.minPrice && box.price <= +params?.maxPrice
        );
        this.filteredListBox = this.getCardItemFormatted(filteredBoxInInterval);
        break;
      case StoreBoxFiltering.BEST_SELLING:
        const filteredBoxBestSelling = this.allBoxSync.filter(
          box => box.boxParams?.isBestSelling
        );
        this.filteredListBox = this.getCardItemFormatted(
          filteredBoxBestSelling
        );
        break;
      case StoreBoxFiltering.IS_NEW:
        const filteredBoxnew = this.allBoxSync.filter(
          box => box.boxParams?.isNew
        );
        this.filteredListBox = this.getCardItemFormatted(filteredBoxnew);
        break;
      default:
        this.filteredListBox = this.listBox;
    }

    // Combined from filter by name to other filtering
    if (
      this.filterInputContent &&
      this.filterInputContent !== '' &&
      filterBy !== StoreBoxFiltering.BY_NAME
    ) {
      this.filterByBoxName();
    }

    // Check box in subcategory
    this.filteredListBox = this.getBoxIdsFormSubCategory();
  }

  private filterByBoxName() {
    // this.filterInputContent = params;
    const txtLowerCase = this.filterInputContent?.toLowerCase();
    if (txtLowerCase && txtLowerCase !== '') {
      this.filteredListBox = this.filteredListBox.filter(cardBoxItem =>
        cardBoxItem.title.toLowerCase().includes(txtLowerCase)
      );
    } else if (this.selectedStoreBoxFiltering !== StoreBoxFiltering.BY_NAME) {
      // Combined from Others filtering to filter by name
      this.filterBoxList({
        filterBy: this.selectedStoreBoxFiltering,
        params: this.selectedStoreBoxFilteringParams,
      });
    } else {
      this.filteredListBox = this.listBox;
    }
  }

  updateBoxIdsFormSubCategory(event: any) {
    let { categoryId, list } = event;
    list = [...new Set(list as string[])];
    console.log('all box id :::::: ', list);
    this.selectedCategoryId = categoryId;
    this.allBoxIdsFromSubCategory = list;

    if (this.filterBoxList.length === 0) {
      this.filteredListBox = this.listBox;
    }
    this.filterBoxList({
      filterBy: this.selectedStoreBoxFiltering,
      params: this.selectedStoreBoxFilteringParams,
    });
  }

  getBoxIdsFormSubCategory(): CardBoxItem[] {
    return this.allBoxIdsFromSubCategory.length > 0
      ? this.filteredListBox.filter(box =>
          this.allBoxIdsFromSubCategory.includes(box?.id ?? '')
        )
      : this.filteredListBox;
  }

  unselectCategory() {
    this.filteredListBox = this.listBox;
    this.allBoxIdsFromSubCategory = [];
    this.selectedCategoryId = null;
    if (this.selectedStoreBoxFiltering) {
      this.filterBoxList({
        filterBy: this.selectedStoreBoxFiltering,
        params: this.selectedStoreBoxFilteringParams,
      });
    }

    const backup = this.dropDownDataList;
    this.dropDownDataList = [];
    setTimeout(() => {
      this.dropDownDataList = backup;
    }, 1);
  }

  scrollToTop() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }

  scrollToTopOfFilter() {
    // Access the nativeElement of the div
    const divElement: HTMLDivElement =
      this.scrollableDivBoxFilter.nativeElement;
    // Scroll to the top
    divElement.scrollTop = 0;
  }
}

export interface DropDownData {
  title: DropDownItem;
  list: DropDownItem[];
}
