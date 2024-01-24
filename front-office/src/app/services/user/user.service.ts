import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { IAddress, IUser } from 'src/app/store/user/user.interface';
import { UserQuery } from 'src/app/utils/Query/user.query';
import { AuthService } from '../auth/auth.service';
import { User } from '@prisma/index';

const SUB_BASE_URL = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  getUserId() {
    return localStorage.getItem('userId') ?? '';
  }

  getUserById(params: UserQuery): Observable<IUser> {
    return this.dataService.getAll(
      `${SUB_BASE_URL}/${this.getUserId()}`,
      params
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.dataService.updateOne(`${SUB_BASE_URL}`, this.getUserId(), {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      photoUrl: user.photoUrl,
      isActif: user.isActif,
      phone: user.phone,
      email: user.email,
      password: user.password,
      gender: user.gender,
      birthDate: user.birthDate,
    });
  }

  getUserAddress(): Observable<IAddress[]> {
    return this.dataService.getAll(`address`, {
      where: { userId: this.getUserId() },
    });
  }

  createUserAddress(address: IAddress): Observable<IAddress> {
    return this.dataService.postOne(`address`, {
      ...address,
      userId: this.getUserId(),
    });
  }

  updateUserAddress(addressId: string, address: any): Observable<IAddress> {
    return this.dataService.updateOne(`address`, addressId, address);
  }
}
