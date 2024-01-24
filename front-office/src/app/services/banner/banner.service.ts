import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { BannerDTO } from 'src/app/store/banner/banner.interface';
import { BannerQuery } from 'src/app/utils/Query/banner.query';

const SUB_BASE_URL = 'banner-image';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private dataService: DataService) {}

  getAllBanner(params: BannerQuery): Observable<BannerDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL, params);
  }
}
