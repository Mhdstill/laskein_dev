import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseAuthComponent } from '../base-auth.component';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent extends BaseAuthComponent {
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    inputErrorService: InputErrorService,
    private alertService: AlertService,
    private router: Router,
    private translate: TranslateService
  ) {
    super(inputErrorService);
  }

  onResetBtnClicked() {
    super.submitButtonClicked();
    if (this.forgotForm.valid) {
      this.authService
        .resetPassword({
          email: this.forgotForm.controls['email'].value,
          url: `${this.document.baseURI}/auth/new-password`,
        })
        .subscribe((response: any) => {
          // Notif alert
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            // body: 'A password reset link has been sent to your inbox',
            body: this.translate.instant('reset_success'),
            footer: 'footer',
          });
          this.router.navigateByUrl('/');
        });
    }
  }
}

export interface EmailUrl {
  email: string;
  url: string;
}
