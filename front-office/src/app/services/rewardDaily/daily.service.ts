import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { UserBoxQuery } from 'src/app/utils/Query/userBox.query';

const SUB_BASE_URL = 'reward/daily';
const REWARD_TOTAL_EXPENSE = 'reward/level/my-total-expense';
const FILEUIL_TOTAL_EXPENSE = 'patronage/my-total-expense';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  constructor(private dataService: DataService) {}

  getUserBox(params: UserBoxQuery): Observable<UserBoxDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL, params);
  }

  getTotalExpense(): Observable<any> {
    return this.dataService.getAll(REWARD_TOTAL_EXPENSE);
  }

  getFiluelTotalExpense(): Observable<any> {
    return this.dataService.getAll(FILEUIL_TOTAL_EXPENSE);
  }
}

export interface UserBoxDTO {
  id?: string;
  userId?: UserDTO;
  box?: IBox;
  isPlayed?: boolean;
  isLocked?: boolean;
  activationDate?: string;
  deactivationDate?: string;
  type?: string;
  dayNumber?: number;
}

export interface UserDTO {
  id: string;
}

export interface IBox {
  id: string;
  name: string;
  description: string;
  boxImage: IBoxImage[];
}

export interface IBoxImage {
  id: string;
  photoUrl: string;
  status: BoxStatus;
}

export enum BoxStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
  PLAYING = 'PLAYING',
  OTHER = 'OTHER',
}

export enum EnumUserBoxType {
  PURCHASE = 'PURCHASE',
  REWARD_LEVEL = 'REWARD_LEVEL',
  DAILY_REWARD = 'DAILY_REWARD',
}
