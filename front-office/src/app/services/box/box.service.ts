import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { IBox, PurchaseDTO, UserBoxDTO } from 'src/app/store/box/box.interface';
import { BoxQuery } from 'src/app/utils/Query/box.query';
import { UserBoxQuery } from 'src/app/utils/Query/userBox.query';

const SUB_BASE_URL = 'box';
const SUB_BASE_URL_ACHAT = 'box/purchase';
const SUB_BASE_URL_USER_BOX = 'user-box';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  constructor(private dataService: DataService) {}

  getAllBox(params: BoxQuery): Observable<IBox[]> {
    return this.dataService.getAll(SUB_BASE_URL, params);
  }

  getOneBox(id: number, params: BoxQuery): Observable<IBox> {
    return this.dataService.getAll(`${SUB_BASE_URL}/${id}`, params);
  }
  achatBox(achat: PurchaseDTO): Observable<PurchaseDTO> {
    return this.dataService.postOne(SUB_BASE_URL_ACHAT, achat);
  }
  getUserBox(params: UserBoxQuery): Observable<UserBoxDTO> {
    return this.dataService.getAll(SUB_BASE_URL_USER_BOX, params);
  }

  getUserRewardLevelList(params: UserBoxQuery): Observable<UserBoxDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL_USER_BOX, params);
  }
}
