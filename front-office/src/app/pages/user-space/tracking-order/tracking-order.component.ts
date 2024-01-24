import { Component, ElementRef, OnInit } from '@angular/core';
import { DataService } from 'src/app/config/data.service';
import { Order } from 'src/app/store/user/user.interface';
import { Categorie } from 'src/app/components/custom-table/custom-table.component';
import { OrderQuery } from 'src/app/utils/Query/orderQuery';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedDataService } from 'src/app/config/shared-data-service';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
})
export class TrackingOrderComponent implements OnInit {
  tableColumns: string[] = [
    'Photo',
    'Date',
    'Désignation',
    'Adresse_de_livraison',
    'Status',
    'Actions',
  ];
  tableRows: any[] = [];
  customOrders: Order[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private elementRef: ElementRef,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.getAllSubscriptions();
    this.sharedDataService.getOrder().subscribe(data => {
      // Refresh all Nouveuax Blog
      if (data !== null) {
        this.getAllSubscriptions();
      }
    });
  }

  getAllSubscriptions() {
    const orderQuery: OrderQuery = {
      where: {
        shoppingCart: {
          userId: this.authService.getUserId(),
        },
      },
      select: {
        status: true,
        followedLink: true,
        shoppingCart: {
          select: {
            winningDate: true,
            user: {
              select: { address: true },
            },
            game: {
              select: {
                article: {
                  select: {
                    designation: true,
                    articlePhoto: {
                      select: {
                        photoUrl: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    this.dataService.getAll('order', orderQuery).subscribe((data: any) => {
      this.customOrders = data as Order[];
      this.tableRows = this.customOrders.map(order =>
        this.formatToRowObject(order)
      );
    });
  }

  extractDate(dateStringIso: string) {
    const parsedDate = new Date(dateStringIso);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getBoxImageURL(url: string): string {
    // if (url.includes('upload-file')) {
    if (url && url.includes('upload-file')) {
      return `${environment.baseUrl}${url}`;
    } else if (!url || url === '') {
      return '/assets/img/coffre-ouvert.png';
    } else {
      return url;
    }
  }

  formatToRowObject(order: Order): any {
    const address = order?.shoppingCart?.user?.address;
    let statusTranslation = '';

    if (order.status === 'PENDING') {
      statusTranslation = TRANSLATIONS['En_attente'];
    } else if (order.status === 'INPROGRESS') {
      statusTranslation = TRANSLATIONS['En_cours_de_livraison'];
    } else if (order.status === 'ONDELIVERY') {
      statusTranslation = TRANSLATIONS['Adresse_de_livraison'];
    } else if (order.status === 'DELIVERED') {
      statusTranslation = TRANSLATIONS['Livré'];
    } else {
      statusTranslation = order.status;
    }
    const photoUrl = this.getBoxImageURL(
      order.shoppingCart?.game?.article?.articlePhoto?.[0]?.photoUrl || ''
    );
    return {
      Photo: {
        displayValue: photoUrl,
        categorie: Categorie.IMAGE,
        style: { width: '60px', heigth: '60px' },
      },
      Date: {
        displayValue: this.extractDate(order?.shoppingCart?.winningDate),
        categorie: Categorie.TEXT,
        style: {},
      },
      Désignation: {
        displayValue: order?.shoppingCart?.game?.article?.designation
          ? order?.shoppingCart?.game?.article?.designation.substring(0, 16)
          : '',
        categorie: Categorie.TEXT,
        style: {},
      },
      Adresse_de_livraison: {
        displayValue: [
          address?.firstAdress,
          address?.city,
          address?.secondAdress,
        ]
          .filter(value => value)
          .join(', '),
        categorie: Categorie.TEXT,
        style: {},
      },
      Status: {
        displayValue: statusTranslation,
        categorie: Categorie.TEXT,
        style: {
          'background-color': this.getStatusColor(order?.status),
          padding: '5px',
        },
      },
      Actions: {
        displayValue: TRANSLATIONS['Suivie'],
        realLink: order?.followedLink,
        categorie: Categorie.BUTTON,
        class: '!bg-[#1976D2] rounded-[20px] px-3 py-2',
      },
    };
  }
  selectedOrder: Order | undefined;

  goToLink(event: any) {
    const { clickedRowData } = event;
    if (clickedRowData.Actions.realLink) {
      this.selectedOrder = this.customOrders.find(
        test => test.followedLink === clickedRowData.Actions.realLink
      );
      const list = this.selectedOrder?.followedLink;
      window.open(list, '_blank');
    }
  }

  getStatusColor(status: string): string {
    let color = '';
    switch (status) {
      case 'PENDING':
        color = 'red';
        break;
      case 'INPROGRESS':
        color = 'yellow';
        break;
      case 'ONDELIVERY':
        color = 'gray';
        break;
      case 'DELIVERED':
        color = 'green';
        break;
    }
    return color;
  }
}

export const TRANSLATIONS = {
  En_attente: 'En_attente',
  En_cours_de_livraison: 'En_cours_de_livraison',
  Adresse_de_livraison: 'Adresse_de_livraison',
  Livré: 'Livré',
  Suivie: 'Suivie',
};
