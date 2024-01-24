import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent {
  @Input()
  placeHolder = '';

  textValue!: string;

  @Output()
  typedText = new EventEmitter<string>();

  sendTextTyped() {
    this.typedText.emit(this.textValue);
  }
}
