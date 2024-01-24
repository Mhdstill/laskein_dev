import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/config/data.service';
import { GameQuery } from 'src/app/utils/Query/game.query';
import { UserBoxQuery } from 'src/app/utils/Query/userBox.query';

const SUB_BASE_URL_GAME = 'game';
const SUB_BASE_URL_GAME_BY_ID = 'game';
const SUB_BASE_URL_GAME_TRIED = 'game/demo';
const SUB_BASE_URL_USER_BOX = 'user-box';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private dataService: DataService) {}

  lanceGame(news: GameDTO): Observable<GameDTO> {
    return this.dataService.postOne(SUB_BASE_URL_GAME, news);
  }

  getOneGameUser(id: number, params: GameQuery): Observable<GameDTO> {
    return this.dataService.getAll(`${SUB_BASE_URL_GAME_BY_ID}/${id}`, params);
  }

  getOneGame(id: number): Observable<GameDTO> {
    return this.dataService.getAll(`${SUB_BASE_URL_GAME_BY_ID}/${id}`);
  }

  getGame(params: GameQuery): Observable<GameDTO> {
    return this.dataService.getAll(SUB_BASE_URL_GAME, params);
  }
  getGameDemo(): Observable<GameDTO> {
    return this.dataService.getAll(SUB_BASE_URL_GAME_TRIED);
  }

  lanceGameDemo(news: GameDTO): Observable<GameDTO> {
    return this.dataService.postOne(SUB_BASE_URL_GAME_TRIED, news);
  }
  getUserBox(id: number, params: UserBoxQuery): Observable<UserBoxDTO> {
    return this.dataService.getAll(`${SUB_BASE_URL_USER_BOX}/${id}`, params);
  }

  getAllUserBox(params?: UserBoxQuery): Observable<UserBoxDTO[]> {
    return this.dataService.getAll(SUB_BASE_URL_USER_BOX, params);
  }
}
export interface UserBoxDTO {
  id: string;
  userId: UserDTO;
  boxId: string;
  box?: IBox;
  isPlayed: boolean;
  isLocked?: boolean;
  type?: string;
  boxArticle: BoxArticleDTO;
  updatedAt: string;
}

export interface GameDTO {
  id?: string;
  userBoxId: string;
  userBox?: UserBoxDTO;
  reference?: string;
  startDate?: string;
  status?: string;
  articleId?: string;
  article?: ArticleDTO;
  shoppingCart?: ShoppingCartDTO;
  gainPercentage?: string;
  gainDraw?: string;
}

export interface IBox {
  id: string;
  reference: string;
  name: string;
  price: number;
  number: 0;
  description: string;
  badge: string;
  boxType: IBoxType;
  boxImage: IBoxImage[];
  article: ArticleDTO[];
  boxArticle: BoxArticleDTO;
  boxParams: any;
}

export interface IBoxImage {
  id: string;
  photoUrl: string;
  status: BoxStatus;
}
export interface IBoxType {
  id: string;
  reference: string;
  name: string;
}

export interface BoxArticleDTO {
  id: string;
  winningChance: number;
  box: IBox;
  article: ArticleDTO;
}

export interface ArticleDTO {
  id: string;
  reference: string;
  designation: string;
  size: string;
  observation: string;
  articlePhoto: ArticlePhotoDTO[];
  price: PriceDTO;
  // boxArticle: BoxArticleDTO;
}

export interface ShoppingCartDTO {
  id: string;
  isClaimed: string;
  articleId: ArticleDTO;
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

export enum StoreBoxFiltering {
  BY_NAME,
  PRICE_INTERVAL,
  PRICE_DESCENDING,
  PRICE_ASCENDING,
  LESS_THAN_X_PRICE,
  GREATER_THAN_X_PRICE,
  BEST_SELLING,
  IS_NEW,
}

export enum BoxStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
  PLAYING = 'PLAYING',
  OTHER = 'OTHER',
}

export enum ArticleStatus {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  LAST = 'LAST',
}

export interface UserDTO {
  id: string;
}
