import { Injectable } from '@angular/core';
import { Transaction } from '@prisma/index';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { IBox } from 'src/app/store/box/box.interface';
import { ITransaction } from 'src/app/store/user/user.interface';
import { TransactionQuery } from 'src/app/utils/Query/transaction.query';

const SUB_BASE_URL = 'transaction';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private dataService: DataService) {}

  getAllTransactions(params?: TransactionQuery): Observable<ITransaction[]> {
    return this.dataService.getAll(SUB_BASE_URL, params);
  }
}
