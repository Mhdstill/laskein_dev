import { configureStore } from '@reduxjs/toolkit';
import { offerSlice } from './abonnement/offer/modelsSlice';
import { subscriptionSlice } from './abonnement/subscription/historicalSlice';
import { bannerImageSlice } from './advertissment/banner/imageSlice';
import { articlePhotoSlice } from './article/_/articlePhoto/articlePhotoSlice';
import { articleSlice } from './article/_/articleSlice';
import { categorySlice } from './article/category/categorySlice';
import { priceSlice } from './article/price/priceSlice';
import { providerSlice } from './article/provider/providerSlice';
import { subCategorySlice } from './article/sub-category/subCategorySlice';
import { authSlice } from './auth/authSlice';
import { bankSlice } from './bank/newsLetterSlice';
import { boxArticleSlice } from './box/box-article/boxArticleSlice';
import { boxImageSlice } from './box/box-image/boxImageSlice';
import { boxSlice } from './box/boxSlice';
import { boxTypeSlice } from './box/type/boxTypeSlice';
import { boxParamsSlice } from './boxParams/boxParamsSlice';
import { dashboardSlice } from './dashboard/dashboardSlice';
import { emailSlice } from './email/emailSlice';
import { fileSlice } from './file/fileSlice';
import { gameSlice } from './game/gameSlice';
import { historicalSlice } from './historical/historicalSlice';
import { modelsSlice } from './model/modelsSlice';
import { newsLetterSlice } from './newsLetter/newsLetterSlice';
import { notificationSlice } from './notification/notificationSlice';
import { orderSlice } from './order/orderSlice';
import { outerTransactionSlice } from './outerTransation/outerTransactionSlice';
import { patronageSlice } from './patronage/patronageSlice';
import { permissionSlice } from './permission/modelsSlice';
import { postSlice } from './post/postSlice';
import { boxRewardLevelSlice } from './reward/boxRewardLevel/boxRewardLevelSlice';
import { dailyRewardSlice } from './reward/daily/dailyRewardSlice';
import { rewardLevelSlice } from './reward/level/rewardLevelSlice';
import { roleSlice } from './role/modelsSlice';
import { ruleSlice } from './rule/ruleSlice';
import { temoignageSlice } from './temoignage/subCategorySlice';
import { transactionSlice } from './transaction/transactionSlice';
import { uiSlice } from './ui/uiSlice';
import { unitySizeSlice } from './unitySize/modelsSlice';
import { utilisatelurSlice } from './users/admin/utilsateurSlice';
import { memberSlice } from './users/member/memberSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    box: boxSlice.reducer,
    boxType: boxTypeSlice.reducer,
    boxImage: boxImageSlice.reducer,
    rule: ruleSlice.reducer,
    notification: notificationSlice.reducer,
    subCategory: subCategorySlice.reducer,
    category: categorySlice.reducer,
    price: priceSlice.reducer,
    provider: providerSlice.reducer,
    article: articleSlice.reducer,
    models: modelsSlice.reducer,
    file: fileSlice.reducer,
    member: memberSlice.reducer,
    utilisateur: utilisatelurSlice.reducer,
    role: roleSlice.reducer,
    permission: permissionSlice.reducer,
    unitySize: unitySizeSlice.reducer,
    offer: offerSlice.reducer,
    temoignage: temoignageSlice.reducer,
    boxArticle: boxArticleSlice.reducer,
    articlePhoto: articlePhotoSlice.reducer,
    order: orderSlice.reducer,
    historical: historicalSlice.reducer,
    subscription: subscriptionSlice.reducer,
    newsLetter: newsLetterSlice.reducer,
    post: postSlice.reducer,
    patronage: patronageSlice.reducer,
    bank: bankSlice.reducer,
    boxParams: boxParamsSlice.reducer,
    bannerImage: bannerImageSlice.reducer,
    transaction: transactionSlice.reducer,
    dailyReward: dailyRewardSlice.reducer,
    rewardLevel: rewardLevelSlice.reducer,
    boxRewardLevel: boxRewardLevelSlice.reducer,
    game: gameSlice.reducer,
    outerTransaction: outerTransactionSlice.reducer,
    email: emailSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
