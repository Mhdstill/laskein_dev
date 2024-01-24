import { Component } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { InputErrorService } from '../services/input-error/input-error.service';

export class BaseComponent {
  submitBtnClicked: boolean = false;

  constructor(public inputErrorService: InputErrorService) {}

  submitButtonClicked() {
    this.submitBtnClicked = true;
  }

  getInputError(formControl: AbstractControl, formControlName: string): string {
    return this.submitBtnClicked
      ? this.inputErrorService.getInputError(
          formControl as FormControl,
          formControlName
        )
      : '';
  }
}
