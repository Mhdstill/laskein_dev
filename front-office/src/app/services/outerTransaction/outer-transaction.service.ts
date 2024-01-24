import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';

const SUB_BASE_URL = 'outer-transaction';
@Injectable({
  providedIn: 'root',
})
export class OuterTransactionService {
  constructor(private dataService: DataService) {}

  createDeposit(
    outerTransaction: OuterTransactionDto
  ): Observable<OuterTransactionDto> {
    return this.dataService.postOne(
      SUB_BASE_URL + '/deposit',
      outerTransaction
    );
  }

  createWithdraw(
    outerTransaction: OuterTransactionDto
  ): Observable<OuterTransactionDto> {
    return this.dataService.postOne(
      SUB_BASE_URL + '/withdraw',
      outerTransaction
    );
  }
}

export enum EnumTypeTransaction {
  DEPOSIT = 'DEPOSIT',
  EXCHANGE = 'EXCHANGE',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
  SUBSCRIBE = 'SUBSCRIBE',
  BONUS = 'BONUS',
}

export enum EnumStatusTransaction {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
}

interface OuterTransactionDto {
  id?: string;
  type: EnumTypeTransaction;
  date: Date | string;
  amount: number;
  status: EnumStatusTransaction;
  sourceId?: string | null;
  userId: string;
  currency?: string | null;
  description?: string | null;
  stripeTransactionId?: string | null;
}
