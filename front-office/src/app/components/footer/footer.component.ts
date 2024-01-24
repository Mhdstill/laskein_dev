import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  getAppVersion() {
    // return environment.APP_VERSION ?? '0.0.1';
    return '0.1.11';
  }
}
