import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-metion-legale',
  templateUrl: './metion-legale.component.html',
  styleUrls: ['./metion-legale.component.scss'],
})
export class MetionLegaleComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToHome() {
    this.router.navigateByUrl('/');
  }
}
