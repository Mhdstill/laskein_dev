import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BaseAuthComponent } from '../base-auth.component';
import { InputErrorService } from '../../../services/input-error/input-error.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { getPasswordValidators } from '../login/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseAuthComponent implements OnInit {
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;
  password: string = '';
  passwordConfirm: string = '';
  userData!: User;
  acceptAndReadBtnClicked: boolean = true;
  userParentId!: string;
  showModal: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', getPasswordValidators()),
    passwordConfirm: new FormControl('', getPasswordValidators()),
    acceptAndReadTerms: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    inputErrorService: InputErrorService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    super(inputErrorService);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmVisibility(): void {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  mapValueInModel() {
    this.userData = new User();
    this.userData.email = this.registerForm.controls['email'].value;
    this.userData.username = this.registerForm.controls['username'].value;
    this.userData.firstName = this.registerForm.controls['name'].value;
    this.userData.lastName = this.registerForm.controls['surname'].value;
    this.userData.password = this.registerForm.controls['password'].value;
  }

  onRegister() {
    super.submitButtonClicked();
    if (this.registerForm.valid && this.password === this.passwordConfirm) {
      this.mapValueInModel();
      this.authService.register(this.userData, this.userParentId).subscribe(
        (response: any) => {
          // Notif alert
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            body: this.translate.instant('register'),
            footer: 'footer',
          });
          this.router.navigateByUrl('/auth');
        },
        error => {
          if (error.status === 400) {
            const errorMessage = error.error?.message[0] || 'Erreur inconnue';
            if (errorMessage === 'Email already exist') {
              this.alertService.showAlert('ERROR', {
                header: 'Info',
                body: this.translate.instant('errorRegister'),
              });
            } else {
              this.alertService.showAlert('ERROR', {
                header: 'Erreur',
                body: errorMessage,
              });
              this.translate.instant('errorRegister');
            }
          } else {
            this.alertService.showAlert('ERROR', {
              header: 'Erreur',
              body: this.translate.instant('errorRegister'),
            });
          }
        }
      );
    }
  }

  resetForm() {
    this.registerForm.reset();
  }

  passwordMatch(): string | null {
    const error = this.getInputError(
      this.registerForm.controls['passwordConfirm'],
      'passwordConfirm'
    );
    if (!error && this.password !== '' && this.passwordConfirm !== '') {
      return this.password === this.passwordConfirm
        ? ''
        : 'Password does not match';
    }
    return null;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Get the values of the route parameters
      this.userParentId = params['userId'];
      // Do something with the route parameters
    });
  }

  getPasswordValidationErrors(): string[] {
    const errorList: string[] = [];
    const passwordControl = this.registerForm.controls['password'];
    if (passwordControl && passwordControl.touched) {
      const errors = passwordControl.errors ?? {};
      const errorsKeys = Object.keys(errors);
      if (errorsKeys) {
        errorsKeys.forEach(error => {
          switch (error) {
            case 'required':
              errorList.push('Password is required');
              break;
            case 'minlength':
              errorList.push(
                `Password should not be less than ${errors['minlength']['requiredLength']} characters`
              );
              break;
            case 'containsLowerAndUpperCase':
              errorList.push(
                `Password should contain lowercase and uppercase characters`
              );
              break;
          }
        });
      }
    }
    return errorList;
  }
}
