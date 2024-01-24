import { IBox } from '../box/box.interface';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  photoUrl: string;
  isActif: boolean;
  phone: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
  address: IAddress;
  wallet?: IWallet;
  shoppingCart?: IShoppingCart[];
  subscription?: ISubscription[];
  emailIsVerified?: boolean;
}

export enum Gender {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

export interface IAddress {
  id: string;
  firstAdress: string;
  secondAdress: string;
  zipCode: string;
  city: string;
  region: string;
  country: string;
  additionnalInformation: string;
  userId: string;
}

export interface IWallet {
  balance: number;
  createdAt: string;
  id: string;
  updatedAt: string;
  userId: string;
}

export interface ISubscription {
  id: string;
  startDate: string;
  autoRenewal: boolean;
  offer: IOffer;
  durationType: EnumPriceSubscription;
  endDate: string;
}

export enum EnumPriceSubscription {
  ONEMONTH = 'ONEMONTH',
  THREEMONTHS = 'THREEMONTH',
}

export interface IOffer {
  id: string;
  name: String;
  price: number;
  color: String;
  numberMysteryBoxBronze: number;
  numberMysteryBoxSylver: number;
  numberMysteryBoxGold: number;
  isAwardLevelActive: Boolean;
  isWeeklyAwardActive: Boolean;
  isStandardSupportActive: Boolean;
  isVIPSupportActive: Boolean;
  duration: number;
}

export interface IShoppingCart {
  winningDate: string;
  game: IGame;
  userId: string;
  user?: IUser;
  transaction: ITransaction;
  isClaimed?: boolean;
}

export interface ITransaction {
  type: EnumTypeTransaction;
  date: string;
  amount: number;
  status: EnumStatusTransaction;
  box?: IBox;
  walletId: string;
  shoppingCart: IShoppingCart;
  bankId: string;
}

export interface IGame {
  id: string;
  reference: String;
  startDate: string;
  endDate: string;
  status: EnumStatusGame;
  article: IArticle;
}

export enum EnumTypeMode {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
  CHILD = 'CHILD',
}

export interface IArticle {
  reference: string;
  designation: string;
  type: EnumTypeMode;
  size: String;
  color: String;
  productUrl: String;
  observation: String;
  winningChance: number;
  providerId: string;
  unitySizeid: string;
  subCategoryId: string;
  boxId: string;
  articlePhoto?: ArticlePhotoDTO[];
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

export interface Order {
  status: EnumOrderStatus;
  followedLink: string;
  orderNumber: string;
  shoppingCart: IShoppingCart;
}

export interface ICategory {
  id: string;
  reference: string;
  name: string;
  subCategory: ISubCategory[];
}

export interface ISubCategory {
  id: string;
  reference: string;
  name: string;
  category: ICategory;
  categoryId: string;
  article: IArticle[];
}

export interface IPatronage {
  gainPercentage: number;
  discountPercentage: number;
  bonusEndDate: string;
  userParent: IUser;
  userChild: IUser;
  updatedAt?: string;
  status: string;
}

export enum EnumStatusTransaction {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
}

export enum EnumTypeTransaction {
  DEPOSIT = 'DEPOSIT',
  EXCHANGE = 'EXCHANGE',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
}

export enum EnumStatusGame {
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  ONDELIVERY = 'ONDELIVERY',
  DELIVERED = 'DELIVERED',
}
