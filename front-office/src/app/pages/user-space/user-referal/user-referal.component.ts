import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { ReferalService } from 'src/app/services/referal/referal.service';
import { IPatronage } from 'src/app/store/user/user.interface';

@Component({
  selector: 'app-user-referal',
  templateUrl: './user-referal.component.html',
  styleUrls: ['./user-referal.component.scss'],
})
export class UserReferalComponent implements OnInit {
  isFileul!: boolean;
  children: IPatronage[] = [];
  parents: IPatronage[] = [];

  constructor(
    private referalService: ReferalService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.setup();
    this.sharedDataService.getListPatronage().subscribe(data => {
      if (data !== null) {
        // refresh patronage
        this.setup();
      }
    });
  }

  async setup() {
    this.children = await this.referalService.getUserChildren().toPromise();
    this.parents = await this.referalService.getUserParents().toPromise();
    this.isFileul = !!(this.parents.length > 0);
  }
}

export const MIN_MONTANT_DEPENSE = 50;
