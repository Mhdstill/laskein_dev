import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';

const SUB_BASE_URL = 'stripe';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private dataService: DataService) {}

  createCharge(charge: ChargeDTO): Observable<ChargeDTO> {
    return this.dataService.postOne(SUB_BASE_URL + '/charge', charge);
  }
}

export interface ChargeDTO {
  amount: number;
  source: string;
  currency: string;
  description: string;
}
