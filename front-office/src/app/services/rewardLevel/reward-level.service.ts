import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { RewardLevelQuery } from 'src/app/utils/Query/rewardLevel.query';
import { UserBoxQuery } from 'src/app/utils/Query/userBox.query';

const SUB_BASE_URL_REWARD_LEVEL = 'reward/level';
const SUB_BASE_URL_REWARD_LEVEL_MY_EXPENSE_LINE =
  'reward/level/my-expense-line';
const SUB_BASE_URL_REWARD_LEVEL_MY_TOTAL_EXPENSE =
  'reward/level/my-total-expense';

@Injectable({
  providedIn: 'root',
})
export class RewardLevelService {
  constructor(private dataService: DataService) {}

  getAllRewardLevel(params?: RewardLevelQuery): Observable<RewaedLevelDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL_REWARD_LEVEL, params);
  }

  getAllRewardLevelExpenseLine(): Observable<MyExpenseLineDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL_REWARD_LEVEL_MY_EXPENSE_LINE);
  }
  getAllRewardLevelMyTotalExpense(): Observable<any> {
    return this.dataService.getAll(SUB_BASE_URL_REWARD_LEVEL_MY_TOTAL_EXPENSE);
  }
}

export interface MyExpenseLineDTO {
  id?: string;
  orderNumber?: number;
  unlockThreshold?: number;
  name?: string;
  color?: string;
}
export interface MyTotalExpenseDTO {
  value: any;
  ndrTotal?: number;
}
export interface RewaedLevelDTO {
  id?: string;
  userId?: UserDTO;
  box?: IBox;
  isPlayed?: boolean;
  isLocked?: boolean;
  type?: string;
  dayNumber?: number;
  unlockThreshold?: number;
  orderNumber?: number;
  updatedAt?: string;
  msg: string;
}

export interface UserDTO {
  id: string;
}

export interface IBox {
  id: string;
  name: string;
  description: string;
  boxImage: IBoxImage[];
  boxType: BoxTypeDTO;
}

export interface BoxTypeDTO {
  id: string;
  reference: string;
  name: string;
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
