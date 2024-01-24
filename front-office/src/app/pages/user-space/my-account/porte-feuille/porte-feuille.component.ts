import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  EnumStatusGame,
  EnumStatusTransaction,
  EnumTypeMode,
  EnumTypeTransaction,
  IArticle,
  ITransaction,
  IUser,
} from 'src/app/store/user/user.interface';
import * as fromUser from '../../../../store/user/index';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import {
  getRandomProductName,
  transactionInstance,
} from './transactions-fake-data';
import {
  Categorie,
  TableItem,
} from 'src/app/components/custom-table/custom-table.component';
import { IBox } from 'src/app/store/box/box.interface';

@Component({
  selector: 'app-porte-feuille',
  templateUrl: './porte-feuille.component.html',
  styleUrls: ['./porte-feuille.component.scss'],
})
export class PorteFeuilleComponent implements OnInit {
  // titles = ['wallet.Type', 'wallet.Prix', 'wallet.Date', 'wallet.Nom_produit'];
  user$!: Observable<IUser>;
  user!: IUser;
  transactions: ITransaction[] = [];

  tableColumns: string[] = ['Type', 'Prix', 'Date', 'Nom_produit'];
  tableRows: any[] = [];

  constructor(
    private readonly store: Store,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(fromUser.selectUserById));
    this.user$.subscribe(async userById => {
      this.user = userById;
      // Get all user transactions
      this.transactions =
        (await this.walletService
          .getAllTransactions({
            include: {
              box: true,
              shoppingCart: {
                include: {
                  game: {
                    include: {
                      article: true,
                    },
                  },
                },
              },
            },
            where: { walletId: this.user.wallet?.id },
          })
          .toPromise()) ?? [];
      this.populateTableRows();
    });
  }

  populateTableRows() {
    const rows: any[] = [];
    this.transactions.forEach(trans => {
      rows.push(this.formatToRowObject(trans));
    });
    this.tableRows = rows;
    // To comment once there is a real data
    if (this.transactions.length === 0) {
      this.generateFakeData();
    }
  }

  generateFakeData() {
    const rows: any[] = [];
    Array.from({ length: 50 }, (_, index) => {
      const updatedTransactionInstance = transactionInstance;
      updatedTransactionInstance.amount = Math.random();
      updatedTransactionInstance.shoppingCart.game.article.designation =
        getRandomProductName();
      this.transactions.push(transactionInstance);
      rows.push(this.formatToRowObject(transactionInstance));
    });
    this.tableRows = rows;
  }

  extractDate(dateStringIso: string) {
    const parsedDate = new Date(dateStringIso);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatToRowObject(transaction: ITransaction) {
    // let statusTranslation = TRANSLATIONS[transaction.type] || transaction.type;

    let statusTranslation = '';

    if (transaction.type === 'DEPOSIT') {
      statusTranslation = TRANSLATIONS['Dépôt'];
    } else if (transaction.type === 'EXCHANGE') {
      statusTranslation = TRANSLATIONS['échange'];
    } else if (transaction.type === 'PURCHASE') {
      statusTranslation = TRANSLATIONS['achat'];
    } else if (transaction.type === 'WITHDRAWAL') {
      statusTranslation = TRANSLATIONS['retrait'];
    } else if (transaction.type === 'BONUS') {
      statusTranslation = TRANSLATIONS['Bonus'];
    } else if (transaction.type === 'SUBSCRIBE') {
      statusTranslation = TRANSLATIONS['Abonnement'];
    } else {
      statusTranslation = transaction.type;
    }
    return {
      Type: {
        displayValue: statusTranslation,
        categorie: Categorie.TEXT,
        style: {},
      },
      Prix: {
        displayValue: transaction?.amount + ' €',
        categorie: Categorie.TEXT,
        style: {},
      },
      Date: {
        displayValue: this.extractDate(transaction?.date),
        categorie: Categorie.TEXT,
        style: {},
      },
      Nom_produit: {
        displayValue: this.getProductName(
          transaction.type,
          transaction.box,
          transaction?.shoppingCart?.game?.article
        ),
        // transaction?.shoppingCart?.game?.article?.designation ?? '',
        categorie: Categorie.TEXT,
        style: {},
      },
    };
  }

  getProductName(
    typeTransaction: EnumTypeTransaction,
    box: IBox | undefined,
    article: IArticle
  ): string {
    let productName = '';
    switch (typeTransaction) {
      case EnumTypeTransaction.PURCHASE:
        productName = box?.name ?? '';
        break;
      case EnumTypeTransaction.EXCHANGE:
        productName = article?.designation;
        break;
      default:
        productName = '';
    }
    return productName;
  }
}

export const TRANSLATIONS = {
  Type: 'Type',
  Prix: 'Prix',
  Date: 'Date',
  Nom_du_produit: 'Nom_produit',
  Dépôt: 'Dépôt',
  échange: 'échange',
  achat: 'achat',
  retrait: 'retrait',
  Bonus: 'Bonus',
  Abonnement: 'Abonnement',
};
