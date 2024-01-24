import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '../store/user/index';
import { AuthService } from '../services/auth/auth.service';
import { GlobalSocketService } from '../services/socket/global-socket.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private authService: AuthService,
    private globalSocketService: GlobalSocketService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.store.dispatch(fromUser.getUserById());
    }
  }
}
