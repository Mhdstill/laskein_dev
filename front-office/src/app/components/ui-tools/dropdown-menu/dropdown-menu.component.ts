import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input()
  disabled = false;

  dropDownTitleValue!: DropDownItem;

  @Input()
  set dropDownTitle(value: DropDownItem) {
    if (value) {
      this.dropDownTitleValue = value;
      this.initialDropDownTitle = this.dropDownTitleValue;
    }
  }

  initialDropDownTitle!: DropDownItem;

  @Input()
  dropdownList: DropDownItem[] = [];

  @Input()
  buttonWidth: number | undefined;

  modeSelection: boolean = false;
  mode: any;

  @Input()
  set selectMode(value: boolean) {
    this.modeSelection = value;
  }
  @Input()
  set select(value: any) {
    this.mode = value;
  }

  @Input()
  addBorder = false;

  @Input()
  dropDownLink = false;

  @Input()
  selectTitle!: string;
  selectedExcerpt: string = '';

  @Output()
  labelOptionClicked: EventEmitter<string> = new EventEmitter();

  @Output()
  emitListFromOption: EventEmitter<any> = new EventEmitter();

  displayDropdown = true;

  ngOnInit() {
    this.getDropdownTitle();
  }

  getBtnClass() {
    let myClass =
      'flex justify-center items-center flex  w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800';
    if (this.addBorder) {
      myClass += ' border border-gray-300';
    }
    return myClass;
  }

  optionClicked(dropDownItem: DropDownItem) {
    if (this.modeSelection) {
      this.dropDownTitleValue = dropDownItem;
    }
    this.labelOptionClicked.emit(dropDownItem.text);
    if (dropDownItem.list) {
      this.emitListFromOption.emit({
        categoryId: this.initialDropDownTitle.id,
        list: dropDownItem.list,
      });
    }

    // Close dropdown
    this.displayDropdown = !this.displayDropdown;
  }

  getDropdownTitle() {
    if (!this.dropDownTitleValue) {
      this.dropDownTitleValue = this.dropdownList[0];
    }
  }

  showDropDown() {
    this.displayDropdown = true;
  }

  // showDropDown() {
  //   this.displayDropdown = !this.displayDropdown;
  //   // if (this.displayDropdown && !this.modeSelection) {
  //   //   this.displayDropdown = false;
  //   // } else {
  //   //   this.displayDropdown = true;
  //   // }
  // }

  getCssButton() {
    const cssButton = this.getButtonWidth();
    return cssButton;
  }

  getButtonWidth() {
    if (this.buttonWidth) {
      // return `width : ${this.buttonWidth}px`;
      return `width : ${160}px`;
    } else return '';
  }
}

export interface DropDownItem {
  id?: string;
  icon: string;
  text: string;
  url?: string;
  list?: any[];
}
