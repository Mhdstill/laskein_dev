import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';

@Injectable({
  providedIn: 'root',
})
export class ParrainageService {
  constructor(private dataService: DataService) {}

  getParentBonusFromChild(childId: string): Observable<any> {
    return this.dataService.getAll(`game/bonus-draw-percentage/${childId}`);
  }

  getChildBonus(): Observable<any> {
    return this.dataService.getAll(`game/my-coin-bonus-draw`);
  }

  // getGamebyId(id: string): Observable<any> {
  //   return this.dataService.getAll(`game/${id}`);
  // }
}
