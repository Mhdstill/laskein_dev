import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { IUser } from 'src/app/store/user/user.interface';
import { ShoppingCartQuery } from 'src/app/utils/Query/shoppingCart.query';
import { UserQuery } from 'src/app/utils/Query/user.query';

const SUB_BASE_URL = 'shopping-cart';
const SUB_BASE_URL_REQUEST_DELIVERY = 'shopping-cart/request-delivery';
const SUB_BASE_URL_REQUEST_EXCHANGE = 'shopping-cart/request-exchange';
const SUB_BASE_URL_USER = 'user';
const SUB_BASE_URL_RESEND_CODE = 'auth/member/resend-code-confirm-mail';
const SUB_BASE_URL_ACTIVE_CODE = 'auth/member/code-confirm-mail';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private dataService: DataService) {}

  getAllShoppingCart(
    params?: ShoppingCartQuery
  ): Observable<ShoppingCartDTO[]> {
    return this.dataService.getAll<any>(SUB_BASE_URL, params);
  }

  postRequestDelivery(
    news: RequestDeliveryDTO
  ): Observable<RequestDeliveryDTO> {
    return this.dataService.postOne(SUB_BASE_URL_REQUEST_DELIVERY, news);
  }

  postRequestExchange(
    news: RequestExchangeDTO
  ): Observable<RequestExchangeDTO> {
    return this.dataService.postOne(SUB_BASE_URL_REQUEST_EXCHANGE, news);
  }

  getUser(id: string, params: UserQuery): Observable<IUser> {
    return this.dataService.getAll(`${SUB_BASE_URL_USER}/${id}`, params);
  }

  updateUserAddress(addressId: string, address: any): Observable<IAddress> {
    return this.dataService.updateOne(`address`, addressId, address);
  }

  resendCode(): Observable<any> {
    return this.dataService.getAll(SUB_BASE_URL_RESEND_CODE);
  }

  activeCode(code: CofirmeMailDTO): Observable<CofirmeMailDTO> {
    return this.dataService.postOne(SUB_BASE_URL_ACTIVE_CODE, code);
  }
}

export interface CofirmeMailDTO {
  code: string;
}
export interface ShoppingCartDTO {
  id: string;
  winningDate: string;
  gameId: string;
  game: GameDTO;
  userId: string;
  updatedAt: string;
  createdAt: string;
  isClaimed: boolean;
  isSelected?: boolean | undefined;
}

export interface GameDTO {
  id: string;
  article: ArticleDTO;
}

export interface RequestDeliveryDTO {
  shoppingCartId: string[];
  msg?: string;
}

export interface RequestExchangeDTO {
  shoppingCartId: string[];
  msg?: string;
}
export interface ArticleDTO {
  id: string;
  reference: string;
  designation: string;
  size: string;
  observation: string;
  articlePhoto: ArticlePhotoDTO[];
  price: PriceDTO;
}
export interface PriceDTO {
  id: string;
  reference: string;
  currentPrice: number;
  oldPrice: number;
  rate: number;
  sellingPrice: number;
  reduction: number;
}

export interface ArticlePhotoDTO {
  id: string;
  photoUrl: string;
  status: ArticleStatus;
}

export enum ArticleStatus {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  LAST = 'LAST',
}

export interface IAddress {
  id: string;
  firstAdress: string;
  secondAdress: string;
  zipCode: string;
  city: string;
  region: string;
  country?: string;
  additionnalInformation?: string;
  userId: string;
}
