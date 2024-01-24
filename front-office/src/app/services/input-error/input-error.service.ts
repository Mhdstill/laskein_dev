import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InputErrorService {
  constructor() {}

  getInputError(formControl: FormControl, formControlName: string): string {
    if (!formControl.errors) {
      return '';
    } else if (formControl.errors[formControlName]) {
      return `${formControlName} invalid`;
    } else if (formControl.errors['required']) {
      return `${this.capitalizeFirstLetter(formControlName)} is required`;
    } else if (formControl.errors['minlength']) {
      return `${this.capitalizeFirstLetter(
        formControlName
      )} must have at least ${
        formControl.errors['minlength']['requiredLength']
      } characters`;
    } else return '';
  }

  capitalizeFirstLetter(str: string): string {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  }
}
