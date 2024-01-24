import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-code-confirmation',
  templateUrl: './code-confirmation.component.html',
  styleUrls: ['./code-confirmation.component.scss'],
})
export class CodeConfirmationComponent {
  codeComfirmForm: FormGroup = new FormGroup({
    codeConfirmation: new FormControl('', Validators.required),
  });

  onCodeConfirm() {
    console.log('this.codeComfirmForm.value === ', this.codeComfirmForm.value);
  }
}
