import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingAnimationService {
  private loadingBehavior = new BehaviorSubject(false);
  loading = this.loadingBehavior.asObservable();

  constructor() {}

  showLoading(show: boolean) {
    this.loadingBehavior.next(show);
  }
}
