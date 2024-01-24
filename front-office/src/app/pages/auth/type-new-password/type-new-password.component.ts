import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAuthComponent } from '../base-auth.component';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-type-new-password',
  templateUrl: './type-new-password.component.html',
  styleUrls: ['./type-new-password.component.scss'],
})
export class TypeNewPasswordComponent extends BaseAuthComponent {
  showNewPassword: boolean = false;
  newPassword: string = '';

  showNewConfirmPassword: boolean = false;
  newConfirmPassword: string = '';

  token: string = '';

  newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPasswordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    inputErrorService: InputErrorService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    super(inputErrorService);
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleNewConfirmPasswordVisibility(): void {
    this.showNewConfirmPassword = !this.showNewConfirmPassword;
  }

  onConfirmNewPassword() {
    super.submitButtonClicked();
    if (
      this.newPasswordForm.valid &&
      this.newPassword === this.newConfirmPassword
    ) {
      this.authService
        .setNewPassWord(this.token, {
          password: this.newPassword,
        })
        .subscribe((response: any) => {
          // Notif alert
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            body: 'Votre mot de passe a ete mis a jour avec succes !',
            footer: 'footer',
          });
          this.router.navigateByUrl('/auth');
        });
    }
  }

  passwordMatch(): string | null {
    const error = this.getInputError(
      this.newPasswordForm.controls['newPasswordConfirm'],
      'newPasswordConfirm'
    );
    if (!error && this.newPassword !== '' && this.newConfirmPassword !== '') {
      return this.newPassword === this.newConfirmPassword
        ? ''
        : 'Password does not match';
    }
    return null;
  }
}
