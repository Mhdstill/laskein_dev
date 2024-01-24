import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { BaseAuthComponent } from '../base-auth.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseAuthComponent {
  showPassword: boolean = false;
  password: string = '';
  errorMessage: any;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  setRemember(event: any): void {
    this.loginForm.value.rememberMe = event.target.checked;
  }

  isSpecificRememberSelected(remeber: string): boolean {
    return this.loginForm.value.rememberMe === remeber;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    inputErrorService: InputErrorService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    super(inputErrorService);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // onLogin() {
  //   super.submitButtonClicked();
  //   if (this.loginForm.valid) {
  //     this.authService
  //       .login(this.loginForm.value)
  //       .subscribe((response: any) => {
  //         // Successful login logic
  //         this.router.navigateByUrl('/');
  //       });
  //   }
  // }

  onLogin() {
    super.submitButtonClicked();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        // eslint-disable-next-line no-unused-vars
        (response: any) => {
          // Successful login logic
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            body: this.translate.instant('Bienvenue'),
          });
          this.router.navigateByUrl('/');
        },
        // eslint-disable-next-line no-unused-vars
        error => {
          this.alertService.showAlert('ERROR', {
            header: 'Erreur',
            body: this.translate.instant('login_error'),
          });
        }
      );
    }
  }
}
