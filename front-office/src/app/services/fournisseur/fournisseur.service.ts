import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { BoxQuery } from 'src/app/utils/Query/box.query';
import { ProviderQuery } from 'src/app/utils/Query/provider.query';
import { ProviderDTO } from 'src/app/store/provider/provider.interface';
// import { BoxArticleQuery } from 'src/app/utils/Query/boxArticle.query';

const SUB_BASE_URL = 'provider';
const SUB_BASE_URL_BOX_ARTICLE = 'box';
@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  constructor(private dataService: DataService) {}

  private selectedProviderIdSubject = new BehaviorSubject<string | null>(null);
  selectedProviderId$: Observable<string | null> =
    this.selectedProviderIdSubject.asObservable();

  setSelectedProviderId(providerId: string | null) {
    this.selectedProviderIdSubject.next(providerId);
  }

  getSelectedProviderId(): Observable<any> {
    return this.selectedProviderId$;
  }

  getAllProvider(): Observable<ProviderDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL);
  }
  getAll(): Observable<ProviderDTO[]> {
    const poviderQuery: ProviderQuery = {
      include: {
        article: {
          include: {
            boxArticle: {
              include: {
                box: true,
              },
            },
          },
        },
      },
    };
    return this.dataService.getAll(SUB_BASE_URL, poviderQuery);
  }
}

export interface IBox1 {
  id: string;
  reference: string;
  name: string;
  price: number;
  number: 0;
  description: string;
  badge: string;
}

export interface BoxArticleDTO {
  id: string;
  winningChance: number;
  boxId: string;
  box: IBox1[];
  articleId: string;
  article: ArticleDTO;
}

export interface ArticleDTO {
  id: string;
  providerId: string;
  provider: ProviderDTO;
  boxArticle: BoxArticleDTO[];
}

export interface ProviderDTO1 {
  id: string;
  reference: string;
  companyName: string;
  address: string;
  phone: string;
  webSite: string;
  logo: string;
  isPinned: boolean;
  article?: ArticleDTO[];
}

// export interface BoxDTO {
//   id: string;
//   reference: string;
//   name: string;
//   price: number;
//   number: 0;
//   description: string;
//   badge: string;
//   article: ArticleDTO;
//   boxArticle: BoxArticleDTO;
// }
