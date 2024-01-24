import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox-group',
  templateUrl: './custom-checkbox-group.component.html',
  styleUrls: ['./custom-checkbox-group.component.scss'],
})
export class CustomCheckboxGroupComponent {
  @Input()
  itemList: any[] = [];

  @Input()
  disableAllItems: boolean = false;

  @Output()
  filterParams = new EventEmitter<any>();

  @Input()
  selectedCheckboxIndex = -1;

  constructor() {
    console.log('lll');
  }

  runFilter(filterParams: any, index: number, eltId: any) {
    const isCheckBoxSelect = document.querySelector(
      '#' + eltId
    ) as HTMLInputElement;
    if (isCheckBoxSelect?.checked) {
      this.selectedCheckboxIndex = index;
    } else {
      this.selectedCheckboxIndex = -1;
    }
    this.filterParams.emit({
      filterParams: filterParams,
      selectedCheckboxIndex: this.selectedCheckboxIndex,
    });
  }
}
