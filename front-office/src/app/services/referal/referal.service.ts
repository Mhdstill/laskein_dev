import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { PatronageQuery } from 'src/app/utils/Query/patronage.query';
import { AuthService } from '../auth/auth.service';

const PATRONAGE_URL = 'patronage';

@Injectable({
  providedIn: 'root',
})
export class ReferalService {
  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  getUserChildren(): Observable<any> {
    const referalQuery: PatronageQuery = {
      include: {
        userChild: true,
        userParent: true,
      },
      where: {
        userParentId: this.authService.getUserId(),
      },
    };
    return this.dataService.getAll(
      `${PATRONAGE_URL}/my-sponsored`,
      referalQuery
    );
  }

  getUserParents(): Observable<any> {
    const referalQuery: PatronageQuery = {
      where: {
        userChildId: this.authService.getUserId(),
      },
    };
    return this.dataService.getAll(
      `${PATRONAGE_URL}/my-sponsored`,
      referalQuery
    );
  }
}
