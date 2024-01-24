import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

export function containsLowerAndUpperCase(): ValidatorFn {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && !pattern.test(value)) {
      return { containsLowerAndUpperCase: true };
    }
    return null;
  };
}

export function getPasswordValidators(): ValidatorFn[] {
  return [
    Validators.required,
    Validators.minLength(8),
    containsLowerAndUpperCase(),
  ];
}
