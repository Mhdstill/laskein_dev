import { Component } from '@angular/core';
import { LanguageUtilityService } from './services/utilities/language-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LasKein';

  constructor(utilityService: LanguageUtilityService) {
    utilityService.useLanguage('en');
  }
}
