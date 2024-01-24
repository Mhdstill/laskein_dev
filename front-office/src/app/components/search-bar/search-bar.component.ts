import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StoreBoxFiltering } from 'src/app/store/box/box.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output()
  filterSearch = new EventEmitter<any>();

  showModalFilter: boolean = false;
  checkboxFilterParams: any;
  filterParam: any = [
    {
      text: TRANSLATIONS['+ au - chere'],
      filterParams: {
        filterBy: StoreBoxFiltering.PRICE_DESCENDING,
        params: null,
      },
    },
    {
      text: TRANSLATIONS['- au + chere'],
      filterParams: {
        filterBy: StoreBoxFiltering.PRICE_ASCENDING,
        params: null,
      },
    },
    {
      text: TRANSLATIONS['Nouveaute'],
      filterParams: { filterBy: StoreBoxFiltering.IS_NEW, params: null },
    },
    {
      text: TRANSLATIONS['Plus vendu'],
      filterParams: { filterBy: StoreBoxFiltering.BEST_SELLING, params: null },
    },
    {
      text: TRANSLATIONS['+ de 150€'],
      filterParams: {
        filterBy: StoreBoxFiltering.GREATER_THAN_X_PRICE,
        params: 150,
      },
    },
    {
      text: TRANSLATIONS['100€ a 150€'],
      filterParams: {
        filterBy: StoreBoxFiltering.PRICE_INTERVAL,
        params: {
          minPrice: 100,
          maxPrice: 150,
        },
      },
    },
    {
      text: '- 100€',
      filterParams: {
        filterBy: StoreBoxFiltering.LESS_THAN_X_PRICE,
        params: 100,
      },
    },
  ];
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCheckboxIndex: number = -1;
  minPriceMaxLength!: any;
  maxPriceMaxLength!: any;

  sendTypeTextSearch(text: string) {
    this.filterSearch.emit({
      filterBy: StoreBoxFiltering.BY_NAME,
      params: text,
    });
  }

  getDisableCheckboxStatus(): boolean {
    if (this.minPrice > 0 || this.maxPrice > 0) {
      return true;
    } else return false;
  }

  runFilter() {
    this.showModalFilter = false;
    if (this.getDisableCheckboxStatus()) {
      this.checkboxFilterParams = null;
      // Price interval
      this.filterSearch.emit({
        filterBy: StoreBoxFiltering.PRICE_INTERVAL,
        params: {
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        },
      });
    } else if (this.checkboxFilterParams) {
      this.filterSearch.emit(this.checkboxFilterParams);
    } else {
      this.checkboxFilterParams = null;
      this.filterSearch.emit({
        filterBy: null,
        params: null,
      });
    }
  }

  getParamsFromCustomCheckbox(event: any) {
    const { filterParams, selectedCheckboxIndex } = event;
    this.checkboxFilterParams = filterParams;
    this.selectedCheckboxIndex = selectedCheckboxIndex;

    if (this.selectedCheckboxIndex == -1) {
      this.checkboxFilterParams = null;
    }
  }

  getDisableIntervalPriceStatus() {
    return this.selectedCheckboxIndex === -1 ? false : true;
  }

  restrictMinPriceValueInput(): void {
    if (this.maxPrice > 0 && this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
  }

  restrictMaxPriceValueInput(): void {
    if (
      (this.maxPrice > 0 || this.minPrice > 0) &&
      this.maxPrice < this.minPrice
    ) {
      this.maxPrice = this.minPrice;
    }
  }
}

export const TRANSLATIONS = {
  '+ au - chere': 'shop.Plus_au_moins_cher',
  '- au + chere': 'shop.Moins_au_plus_cher',
  Nouveaute: 'shop.Nouveauté',
  'Plus vendu': 'shop.Plus_vendu',
  '+ de 150€': 'shop.+_de_150€',
  '100€ a 150€': 'shop.100€_à_150€',
};
