import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { BaseComponent } from 'src/app/pages/base-page.component';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import * as fromUser from '../../../../store/user/index';
import { IUser } from 'src/app/store/user/user.interface';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/config/shared-data-service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'],
})
export class CompteComponent extends BaseComponent implements OnInit {
  user$!: Observable<IUser>;
  user!: IUser;

  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;
  password: string = '';
  passwordConfirm: string = '';

  compteForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    public override inputErrorService: InputErrorService,
    private readonly store: Store,
    private sharedDataService: SharedDataService
  ) {
    super(inputErrorService);
    this.sharedDataService.getRunAfterUpdateUser().subscribe(reUpdateFields => {
      if (reUpdateFields) {
        this.setUp();
      }
    });
  }

  ngOnInit() {
    this.setUp();
  }

  setUp() {
    this.compteForm.disable();
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(userById => {
      this.user = userById;
      this.initializeUserForm();
    });
  }

  initializeUserForm() {
    this.compteForm.controls['email'].setValue(this.user.email);
    this.compteForm.controls['username'].setValue(this.user.username);
    this.compteForm.controls['password'].setValue('');
    this.compteForm.controls['passwordConfirm'].setValue('');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmVisibility(): void {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
  submitForm(): void {
    console.log('this.compteForm.value === ', this.compteForm.value);
  }

  handleEnablingForm() {
    if (this.compteForm.disabled) {
      this.compteForm.enable();
    } else {
      this.compteForm.disable();
    }
  }

  updateUserInfo() {
    super.submitButtonClicked();
    const newPassword = this.compteForm.controls['password'].value;
    const newConfirmPassword =
      this.compteForm.controls['passwordConfirm'].value;
    // Create a new object with updated gender
    if (this.compteForm.valid && newPassword === newConfirmPassword) {
      const user: IUser = {
        ...this.user,
        email: this.compteForm.controls['email'].value,
        username: this.compteForm.controls['username'].value,
        // password: this.compteForm.controls['password'].value
      };
      this.store.dispatch(fromUser.updateUser({ user }));
    }
  }

  passwordMatch(): string | null {
    const newPassword = this.compteForm.controls['password'].value;
    const newConfirmPassword =
      this.compteForm.controls['passwordConfirm'].value;
    const error = this.getInputError(
      this.compteForm.controls['passwordConfirm'],
      'passwordConfirm'
    );
    if (!error && newPassword !== '' && newConfirmPassword !== '') {
      return newPassword === newConfirmPassword
        ? ''
        : 'Password does not match';
    }
    return null;
  }
}
