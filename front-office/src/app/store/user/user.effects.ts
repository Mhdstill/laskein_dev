import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromUser from './index';
import { map, switchMap } from 'rxjs/operators';
import { IUser } from './user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private alertService: AlertService,
    private sharedDataService: SharedDataService,
    private readonly store: Store,
    private translate: TranslateService
  ) {}

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.getUserById.type),
      switchMap(() =>
        this.userService
          .getUserById({
            include: {
              address: true,
              wallet: true,
              subscription: true,
              shoppingCart: true,
            },
          })
          .pipe(
            map(data => {
              this.sharedDataService.setProfileHeader(true);
              return data;
            })
          )
      ),
      map((user: IUser) => fromUser.getUserByIdSuccess({ user }))
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.updateUser),
      switchMap(({ user }) => {
        // Backup data
        const address = user.address;
        const wallet = user.wallet;
        const subscription = user.subscription;

        return this.userService.updateUser(user).pipe(
          map(userData => {
            // Run update OK
            this.alertService.showAlert('SUCCESS', {
              header: 'Info',
              body: this.translate.instant('updateInformation'),
              footer: 'footer',
            });

            // Set all address , wallet and subscription
            userData.address = address;
            userData.wallet = wallet;
            userData.subscription = subscription;

            // Re update user fields
            this.sharedDataService.setRunAfterUpdateUser(true);

            return userData;
          })
        );
      }),
      map((user: IUser) => fromUser.updateUserSuccess({ user }))
    )
  );

  //   updateUserAddress$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromUser.updateUserAddress),
  //     switchMap(({ user }) =>
  //       this.userService.updateUserAddress(user).pipe(
  //         map(data => {
  //           // Run update OK
  //           this.alertService.showAlert('SUCCESS', {
  //             header: 'Info',
  //             body: 'Vos informations ont ete mise a jour avec succes !',
  //             footer: 'footer',
  //           });
  //           // Re update user fields
  //           this.sharedDataService.setRunAfterUpdateUser(true);
  //           return data;
  //         })
  //       )
  //     ),
  //     map((user: IUser) => fromUser.updateUserSuccess({ user }))
  //   )
  // );
}
