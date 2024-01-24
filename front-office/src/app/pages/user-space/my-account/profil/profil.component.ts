import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Gender, IUser } from 'src/app/store/user/user.interface';
import * as fromUser from '../../../../store/user/index';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { BaseComponent } from 'src/app/pages/base-page.component';
import { InputErrorService } from 'src/app/services/input-error/input-error.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent extends BaseComponent implements OnInit {
  user$!: Observable<IUser>;
  user!: IUser;
  imageUrl: string | undefined;

  manGender = Gender.MAN;
  womanGender = Gender.WOMAN;

  profilForm: FormGroup = new FormGroup({
    genre: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    dateDeNaissance: new FormControl('', Validators.required),
    telephone: new FormControl(''),
  });

  constructor(
    private readonly store: Store,
    private sharedDataService: SharedDataService,
    public override inputErrorService: InputErrorService
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
    this.profilForm.disable();
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(userById => {
      this.user = userById;
      this.initializeUserForm();
    });
  }

  setGender(gender: string) {
    this.profilForm.controls['genre'].setValue(gender);
  }

  isSpecificGenderSelected(gender: string) {
    return this.profilForm.controls['genre'].value === gender;
  }

  initializeUserForm() {
    this.profilForm.controls['genre'].setValue(this.user.gender);
    this.profilForm.controls['name'].setValue(this.user.lastName);
    this.profilForm.controls['surname'].setValue(this.user.firstName);
    this.profilForm.controls['dateDeNaissance'].setValue(
      this.extractDate(this.user.birthDate)
    );
    this.profilForm.controls['telephone'].setValue(this.user.phone);
  }

  updateUserInfo() {
    super.submitButtonClicked();
    // Create a new object with updated gender
    if (this.profilForm.valid) {
      const user: IUser = {
        ...this.user,
        gender: this.profilForm.controls['genre'].value,
        lastName: this.profilForm.controls['name'].value,
        firstName: this.profilForm.controls['surname'].value,
        birthDate: this.parseDateToISO(
          this.profilForm.controls['dateDeNaissance'].value
        ),
        phone: this.profilForm.controls['telephone'].value,
        photoUrl:
          !this.user.photoUrl || this.user.photoUrl === ''
            ? 'oihiuhiuh1231'
            : this.user.photoUrl,
      };
      this.store.dispatch(fromUser.updateUser({ user }));
    }
  }

  parseDateToISO(inputDate: string) {
    const parsedDate = new Date(inputDate + 'T00:00:00.000Z');
    return parsedDate.toISOString();
  }

  extractDate(dateStringIso: string) {
    const parsedDate = new Date(dateStringIso);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submitForm() {}

  handleEnablingForm() {
    if (this.profilForm.disabled) {
      this.profilForm.enable();
    } else {
      this.profilForm.disable();
    }
  }

  getShortName(): string {
    return (
      this.user?.firstName?.split(' ')[0] +
      ' ' +
      this.user?.lastName?.split(' ')[0]
    );
  }
  selectedImageUrl: string | undefined;

  handleFileInput(event: any): void {
    const selectedFile = event.target.files[0];
    // this.service.uploadImage(file).subscribe((url: string) => {
    //   this.imageUrl = url;
    // });
    if (selectedFile) {
      this.selectedImageUrl = URL.createObjectURL(selectedFile);
      console.log('Fichier sélectionné:', selectedFile);
    }
  }
  downloadImage() {
    // Ajoutez le code pour déclencher le téléchargement de l'image
    // Peut-être une redirection vers l'URL de l'image ou un téléchargement direct
  }

  redirectToShuftipro() {
    const shuftiproUrl = 'https://shuftipro.com';
    window.open(shuftiproUrl, '_blank');
  }
}
