import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { IAddress, IUser } from 'src/app/store/user/user.interface';
import * as fromUser from '../../../../store/user/index';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { BaseComponent } from 'src/app/pages/base-page.component';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mon-adresse',
  templateUrl: './mon-adresse.component.html',
  styleUrls: ['./mon-adresse.component.scss'],
})
export class MonAdresseComponent extends BaseComponent implements OnInit {
  adresseForm: FormGroup = new FormGroup({
    adresse1: new FormControl('', Validators.required),
    adresse2: new FormControl('', Validators.required),
    codePostale: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    autreInformation: new FormControl(''),
  });
  userAddress$!: Observable<IAddress>;
  userAddress!: IAddress;

  user$!: Observable<IUser>;
  user!: IUser;

  constructor(
    private readonly store: Store,
    private sharedDataService: SharedDataService,
    private userService: UserService,
    private alertService: AlertService,
    public override inputErrorService: InputErrorService,
    private translate: TranslateService
  ) {
    super(inputErrorService);
  }

  ngOnInit() {
    this.setUp();
  }

  setUp() {
    this.adresseForm.disable();

    // Get it from user store
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(userById => {
      this.userAddress = userById.address;
      this.initializeUserForm();
    });

    // this.userService.getUserAddress().subscribe(address => {
    //   this.userAddress = address[0] as IAddress;
    //   this.initializeUserForm();
    // });
  }

  getUpdatedAddress() {
    this.adresseForm.disable();
    this.userService.getUserAddress().subscribe(address => {
      this.userAddress = address[0] as IAddress;
      this.initializeUserForm();
      this.store.dispatch(fromUser.getUserById());
    });
  }

  initializeUserForm() {
    if (this.userAddress) {
      this.adresseForm.controls['adresse1'].setValue(
        this.userAddress.firstAdress
      );
      this.adresseForm.controls['adresse2'].setValue(
        this.userAddress.secondAdress
      );
      this.adresseForm.controls['codePostale'].setValue(
        this.userAddress.zipCode
      );
      this.adresseForm.controls['ville'].setValue(this.userAddress.city);
      this.adresseForm.controls['region'].setValue(this.userAddress.region);
      this.adresseForm.controls['pays'].setValue(this.userAddress.country);
      this.adresseForm.controls['autreInformation'].setValue(
        this.userAddress.additionnalInformation
      );
    }
  }

  updateUserInfo() {
    // Create a new object with updated gender
    super.submitButtonClicked();
    if (this.adresseForm.valid) {
      if (this.userAddress) {
        // Update
        const userAddress: IAddress = {
          ...this.userAddress,
          firstAdress: this.adresseForm.controls['adresse1'].value,
          secondAdress: this.adresseForm.controls['adresse2'].value,
          city: this.adresseForm.controls['ville'].value,
          zipCode: this.adresseForm.controls['codePostale'].value,
          region: this.adresseForm.controls['region'].value,
          country: this.adresseForm.controls['pays'].value,
          additionnalInformation:
            this.adresseForm.controls['autreInformation'].value,
        };
        this.userService
          .updateUserAddress(
            userAddress.id,
            this.getNewAddressForServer(userAddress)
          )
          .subscribe(address => {
            this.refreshUserAddress(address);
          });
      } else {
        // Create
        const userAddress: IAddress = {
          firstAdress: this.adresseForm.controls['adresse1'].value,
          secondAdress: this.adresseForm.controls['adresse2'].value,
          city: this.adresseForm.controls['ville'].value,
          zipCode: this.adresseForm.controls['codePostale'].value,
          region: this.adresseForm.controls['region'].value,
          country: this.adresseForm.controls['pays'].value,
          additionnalInformation:
            this.adresseForm.controls['autreInformation'].value,
          id: '',
          userId: '',
        };
        this.userService
          .createUserAddress(this.getNewAddressForServer(userAddress))
          .subscribe(address => {
            this.refreshUserAddress(address);
          });
      }
    }
  }

  private refreshUserAddress(address: IAddress) {
    this.userAddress = address;
    this.updateSuccessAlert();
    this.getUpdatedAddress();
  }

  submitForm() {}

  handleEnablingForm() {
    if (this.adresseForm.disabled) {
      this.adresseForm.enable();
    } else {
      this.adresseForm.disable();
    }
  }

  updateSuccessAlert() {
    this.alertService.showAlert('SUCCESS', {
      header: 'Info',
      body: this.translate.instant('updateAdress'),
      footer: 'footer',
    });
  }

  getNewAddressForServer(address: IAddress): any {
    return {
      firstAdress: address.firstAdress,
      secondAdress: address.secondAdress,
      zipCode: address.zipCode,
      city: address.city,
      region: address.region,
      country: address.country,
      additionnalInformation: address.additionnalInformation,
      userId: address.userId,
    };
  }
}
