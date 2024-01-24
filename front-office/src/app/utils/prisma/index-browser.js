Object.defineProperty(exports, '__esModule', { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
} = require('./runtime/index-browser');

const Prisma = {};

exports.Prisma = Prisma;

/**
 * Prisma Client JS version: 4.14.1
 * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
 */
Prisma.prismaVersion = {
  client: '4.14.1',
  engine: 'd9a4c5988f480fa576d43970d5a23641aa77bc9c',
};

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`);
};
Prisma.validator = () => val => val;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  firstAdress: 'firstAdress',
  secondAdress: 'secondAdress',
  zipCode: 'zipCode',
  city: 'city',
  region: 'region',
  country: 'country',
  additionnalInformation: 'additionnalInformation',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.ArticlePhotoScalarFieldEnum = {
  id: 'id',
  photoUrl: 'photoUrl',
  status: 'status',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.ArticleScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  designation: 'designation',
  type: 'type',
  size: 'size',
  color: 'color',
  productUrl: 'productUrl',
  observation: 'observation',
  winningChance: 'winningChance',
  providerId: 'providerId',
  unitySizeId: 'unitySizeId',
  subCategoryId: 'subCategoryId',
  boxId: 'boxId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BankScalarFieldEnum = {
  id: 'id',
  accountNumber: 'accountNumber',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BannerImageScalarFieldEnum = {
  id: 'id',
  bannerImgUrl: 'bannerImgUrl',
  bannerLink: 'bannerLink',
  type: 'type',
  boxId: 'boxId',
  offerId: 'offerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BoxArticleScalarFieldEnum = {
  id: 'id',
  winningChance: 'winningChance',
  boxId: 'boxId',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BoxImageScalarFieldEnum = {
  id: 'id',
  photoUrl: 'photoUrl',
  status: 'status',
  boxId: 'boxId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BoxParamsScalarFieldEnum = {
  id: 'id',
  isBestSelling: 'isBestSelling',
  isRecommended: 'isRecommended',
  isNew: 'isNew',
  isBigPrice: 'isBigPrice',
  isSubsciptionBonus: 'isSubsciptionBonus',
  boxId: 'boxId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BoxRewardLevelScalarFieldEnum = {
  id: 'id',
  boxId: 'boxId',
  rewardLevelId: 'rewardLevelId',
};

exports.Prisma.BoxScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  name: 'name',
  price: 'price',
  number: 'number',
  description: 'description',
  badge: 'badge',
  boxTypeId: 'boxTypeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.BoxTypeScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CodeConfirmLoginScalarFieldEnum = {
  id: 'id',
  uuid: 'uuid',
  useId: 'useId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.CodeConfirmMailScalarFieldEnum = {
  id: 'id',
  uuid: 'uuid',
  useId: 'useId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.DailyRewardScalarFieldEnum = {
  id: 'id',
  number: 'number',
  boxId: 'boxId',
};

exports.Prisma.GameScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  version: 'version',
  type: 'type',
  userBoxId: 'userBoxId',
  patronageId: 'patronageId',
  gainPercentage: 'gainPercentage',
  gainDraw: 'gainDraw',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.HistoricalScalarFieldEnum = {
  id: 'id',
  date: 'date',
  description: 'description',
  userId: 'userId',
  action: 'action',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  message: 'message',
  sendingDate: 'sendingDate',
  senderId: 'senderId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.ModelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  keyword: 'keyword',
  permissionIDs: 'permissionIDs',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.NewsLetterScalarFieldEnum = {
  id: 'id',
  email: 'email',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.OfferScalarFieldEnum = {
  id: 'id',
  name: 'name',
  price: 'price',
  priceThreeMonth: 'priceThreeMonth',
  color: 'color',
  numberMysteryBoxBronze: 'numberMysteryBoxBronze',
  numberMysteryBoxSylver: 'numberMysteryBoxSylver',
  numberMysteryBoxGold: 'numberMysteryBoxGold',
  isAwardLevelActive: 'isAwardLevelActive',
  isWeeklyAwardActive: 'isWeeklyAwardActive',
  isStandardSupportActive: 'isStandardSupportActive',
  isVIPSupportActive: 'isVIPSupportActive',
  duration: 'duration',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  status: 'status',
  followedLink: 'followedLink',
  orderNumber: 'orderNumber',
  shoppingCartId: 'shoppingCartId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.PatronageScalarFieldEnum = {
  id: 'id',
  gainPercentage: 'gainPercentage',
  discountPercentage: 'discountPercentage',
  status: 'status',
  bonusEndDate: 'bonusEndDate',
  userParentId: 'userParentId',
  userChildId: 'userChildId',
  bonusCollect: 'bonusCollect',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  keyword: 'keyword',
  rulesIDs: 'rulesIDs',
  modelsIDs: 'modelsIDs',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  postUrl: 'postUrl',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.PriceScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  currentPrice: 'currentPrice',
  oldPrice: 'oldPrice',
  rate: 'rate',
  reduction: 'reduction',
  sellingPrice: 'sellingPrice',
  articleId: 'articleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.ProviderScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  companyName: 'companyName',
  address: 'address',
  phone: 'phone',
  webSite: 'webSite',
  logo: 'logo',
  isPinned: 'isPinned',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
};

exports.Prisma.ReceiverScalarFieldEnum = {
  id: 'id',
  readingDate: 'readingDate',
  receiverId: 'receiverId',
  messageId: 'messageId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.RewardLevelScalarFieldEnum = {
  id: 'id',
  orderNumber: 'orderNumber',
  name: 'name',
  unlockThreshold: 'unlockThreshold',
  description: 'description',
};

exports.Prisma.RuleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  keyword: 'keyword',
  permissionIDs: 'permissionIDs',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.ShoppingCartScalarFieldEnum = {
  id: 'id',
  winningDate: 'winningDate',
  isClaimed: 'isClaimed',
  gameId: 'gameId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc',
};

exports.Prisma.SubCategoryScalarFieldEnum = {
  id: 'id',
  reference: 'reference',
  name: 'name',
  categoryId: 'categoryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  startDate: 'startDate',
  endDate: 'endDate',
  durationType: 'durationType',
  status: 'status',
  autoRenewal: 'autoRenewal',
  userId: 'userId',
  offerId: 'offerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.TemoignageScalarFieldEnum = {
  id: 'id',
  comment: 'comment',
  rating: 'rating',
  commentDate: 'commentDate',
  isToShow: 'isToShow',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.TokenBlackListScalarFieldEnum = {
  id: 'id',
  token: 'token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  type: 'type',
  date: 'date',
  amount: 'amount',
  status: 'status',
  boxId: 'boxId',
  walletId: 'walletId',
  offerId: 'offerId',
  shoppingCartId: 'shoppingCartId',
  bankId: 'bankId',
  gameId: 'gameId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UnitySizeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  abbreviation: 'abbreviation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UserBoxScalarFieldEnum = {
  id: 'id',
  type: 'type',
  duration: 'duration',
  dayNumber: 'dayNumber',
  isPlayed: 'isPlayed',
  isLocked: 'isLocked',
  playedDate: 'playedDate',
  activationDate: 'activationDate',
  deactivationDate: 'deactivationDate',
  orderNumber: 'orderNumber',
  name: 'name',
  unlockThreshold: 'unlockThreshold',
  description: 'description',
  userId: 'userId',
  boxId: 'boxId',
  lot: 'lot',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  username: 'username',
  photoUrl: 'photoUrl',
  email: 'email',
  isActif: 'isActif',
  isMember: 'isMember',
  isAdmin: 'isAdmin',
  emailIsVerified: 'emailIsVerified',
  twoAuthIsActive: 'twoAuthIsActive',
  phone: 'phone',
  gender: 'gender',
  birthDate: 'birthDate',
  password: 'password',
  socketId: 'socketId',
  refreshToken: 'refreshToken',
  supportingDocumentUrl: 'supportingDocumentUrl',
  isValideSupportingDocument: 'isValideSupportingDocument',
  registrationBonus: 'registrationBonus',
  latestConnectedDate: 'latestConnectedDate',
  signInCount: 'signInCount',
  lotCount: 'lotCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ruleId: 'ruleId',
  stripeCustomerId: 'stripeCustomerId',
};

exports.Prisma.WalletScalarFieldEnum = {
  id: 'id',
  balance: 'balance',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
};
exports.ArticlePhotoStatus = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
  LAST: 'LAST',
};

exports.BannerImageType = {
  WELCOME: 'WELCOME',
  SUBSCRIPTION: 'SUBSCRIPTION',
  SPONSORSHIP: 'SPONSORSHIP',
  ADVERTISEMENT: 'ADVERTISEMENT',
};

exports.EnumBadgeBox = {
  TENDANCE: 'TENDANCE',
  SOLDE: 'SOLDE',
};

exports.EnumBoxImageStatus = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
  PLAYING: 'PLAYING',
  OTHER: 'OTHER',
};

exports.EnumGender = {
  MAN: 'MAN',
  WOMAN: 'WOMAN',
};

exports.EnumHistoricalAction = {
  READ: 'READ',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

exports.EnumOrderStatus = {
  PENDING: 'PENDING',
  INPROGRESS: 'INPROGRESS',
  ONDELIVERY: 'ONDELIVERY',
  DELIVERED: 'DELIVERED',
};

exports.EnumPermission = {
  READ: 'READ',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

exports.EnumPriceSubscription = {
  ONEMONTH: 'ONEMONTH',
  THREEMONTHS: 'THREEMONTHS',
};

exports.EnumStatusGame = {
  RUNNING: 'RUNNING',
  FINISHED: 'FINISHED',
  ERROR: 'ERROR',
};

exports.EnumStatusPatronage = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  END: 'END',
};

exports.EnumStatusSubscription = {
  INACTIVE: 'INACTIVE',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CANCELED: 'CANCELED',
};

exports.EnumStatusTransaction = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  CANCELED: 'CANCELED',
};

exports.EnumTypeGame = {
  BOX: 'BOX',
  SPONSORED: 'SPONSORED',
  PARENT: 'PARENT',
};

exports.EnumTypeMode = {
  MAN: 'MAN',
  WOMAN: 'WOMAN',
  CHILD: 'CHILD',
};

exports.EnumTypeTransaction = {
  DEPOSIT: 'DEPOSIT',
  EXCHANGE: 'EXCHANGE',
  WITHDRAWAL: 'WITHDRAWAL',
  PURCHASE: 'PURCHASE',
  SUBSCRIBE: 'SUBSCRIBE',
  BONUS: 'BONUS',
};

exports.EnumUserBoxType = {
  PURCHASE: 'PURCHASE',
  REWARD_LEVEL: 'REWARD_LEVEL',
  DAILY_REWARD: 'DAILY_REWARD',
};

exports.EnumVersionGame = {
  FULL: 'FULL',
  DEMO: 'DEMO',
};

exports.Prisma.ModelName = {
  User: 'User',
  Patronage: 'Patronage',
  CodeConfirmLogin: 'CodeConfirmLogin',
  CodeConfirmMail: 'CodeConfirmMail',
  TokenBlackList: 'TokenBlackList',
  Rule: 'Rule',
  Permission: 'Permission',
  Model: 'Model',
  Address: 'Address',
  Wallet: 'Wallet',
  BoxType: 'BoxType',
  Box: 'Box',
  DailyReward: 'DailyReward',
  BoxRewardLevel: 'BoxRewardLevel',
  RewardLevel: 'RewardLevel',
  BoxImage: 'BoxImage',
  Provider: 'Provider',
  Category: 'Category',
  SubCategory: 'SubCategory',
  UnitySize: 'UnitySize',
  Article: 'Article',
  BoxArticle: 'BoxArticle',
  ArticlePhoto: 'ArticlePhoto',
  Post: 'Post',
  Price: 'Price',
  Order: 'Order',
  ShoppingCart: 'ShoppingCart',
  Transaction: 'Transaction',
  Bank: 'Bank',
  UserBox: 'UserBox',
  BannerImage: 'BannerImage',
  BoxParams: 'BoxParams',
  Historical: 'Historical',
  Message: 'Message',
  Receiver: 'Receiver',
  NewsLetter: 'NewsLetter',
  Temoignage: 'Temoignage',
  Offer: 'Offer',
  Subscription: 'Subscription',
  Game: 'Game',
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
    );
  }
}
exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
