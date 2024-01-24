import {
  Component,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() columns!: string[];

  @Output()
  button1Clicked: EventEmitter<any> = new EventEmitter();

  columnWidth!: string;

  rowsValue: any[] = [];

  @Input()
  set rows(value: any[]) {
    if (value) {
      this.rowsValue = value;
      this.totalPages = Math.ceil(this.rowsValue.length / this.itemsPerPage);
      this.updateDisplayedRows();
    }
  }
  itemsPerPage = 5; // Number of items to display per page
  currentPage = 1;
  totalPages = 1;
  displayedRows: any[] = [];

  getCssClassForColumn(index: number) {
    const myClass = `px-6 py-4`;
    return index !== 0
      ? myClass
      : `${myClass} font-medium text-gray-900 whitespace-nowrap dark:text-white`;
  }

  ngOnInit() {
    this.calculateColumnWidth();
  }

  updateDisplayedRows(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedRows = this.rowsValue.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedRows();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedRows();
    }
  }

  calculateColumnWidth() {
    if (this.columns && this.columns.length > 0) {
      this.columnWidth = 100 / this.columns.length + '%';
    }
  }

  emitButton1(row: any) {
    this.button1Clicked.emit({
      clickedRowData: row,
    });
  }
}

export interface TableItem {
  value: any;
  type: ItemText | ItembButton | ItemImage;
  categorie: string;
}

export enum Categorie {
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  LINK = 'LINK',
  IMAGE = 'IMAGE',
}

export interface ItemText {
  isUnderlined: boolean;
}

export interface ItembButton {
  color: string;
}

export interface ItemImage {
  width: number;
  unit: string;
}
