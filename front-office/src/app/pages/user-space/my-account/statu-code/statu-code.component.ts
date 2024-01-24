import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-statu-code',
  templateUrl: './statu-code.component.html',
  styleUrls: ['./statu-code.component.scss'],
})
export class StatuCodeComponent implements OnInit {
  UserMe: any;
  postActiveCodeForm: FormGroup;

  adresseForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private readonly store: Store,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private alertService: AlertService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private translate: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.postActiveCodeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getUser();
    this.sharedDataService.getProfileHeader().subscribe(data => {
      if (data !== null) {
        this.getUser();
      }
    });
  }

  getUser() {
    const userId = this.authService.getUserId();
    this.shoppingCartService
      .getUser(userId, {
        include: {
          address: true,
        },
      })
      .subscribe(response => {
        this.UserMe = response.emailIsVerified;
      });
  }

  postSendCode() {
    this.shoppingCartService.resendCode().subscribe(response => {
      this.alertService.showAlert('SUCCESS', {
        header: 'Info',
        body: this.translate.instant('notifResendCode'),
      });
    });
  }
  onSubmit() {
    if (this.postActiveCodeForm.valid) {
      const pastCode = this.postActiveCodeForm.value.code;
      this.shoppingCartService
        .activeCode({ code: pastCode })
        .subscribe(response => {
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            body: this.translate.instant('notifActiveCompte'),
          });
          this.postActiveCodeForm.reset();
        });
    }
  }
}
