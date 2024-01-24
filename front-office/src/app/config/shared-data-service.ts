import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private reUpdateProfileFields = new BehaviorSubject<boolean>(false);
  private updateProfileHeader = new BehaviorSubject<boolean>(false);
  private updateGlobalOfferList = new BehaviorSubject<any>(null);
  private updateUserWallet = new BehaviorSubject<any>(null);
  private updateShoppingCart = new BehaviorSubject<any>(null);
  private updateGame = new BehaviorSubject<any>(null);
  private updateGameMyCoinBonusDraw = new BehaviorSubject<any>(null);
  private updatGameBonusDrawPercentage = new BehaviorSubject<any>(null);
  private updateGlobalBlogList = new BehaviorSubject<any>(null);
  private updateGlobalProviderList = new BehaviorSubject<any>(null);
  private updateSubscription = new BehaviorSubject<any>(null);
  private updateBanner = new BehaviorSubject<any>(null);
  private updateUserBox = new BehaviorSubject<any>(null);
  private updateDailyReward = new BehaviorSubject<any>(null);
  private stopSpinCircle = new BehaviorSubject<any>(null);
  public tokenExpired = new BehaviorSubject<any>(null);
  private updateUserSocket = new BehaviorSubject<any>(null);
  private updateListPatronage = new BehaviorSubject<any>(null);
  private updateListOrder = new BehaviorSubject<any>(null);

  // new BehaviorSubject(boolean);
  constructor() {}
  getRunAfterUpdateUser(): Observable<any> {
    return this.reUpdateProfileFields;
  }
  setRunAfterUpdateUser(runAfterUpdate: any) {
    this.reUpdateProfileFields.next(runAfterUpdate);
  }

  // token expired
  getIsTokenExpired() {
    return this.tokenExpired;
  }
  setIsTokenExpired(isExpired: boolean) {
    return this.tokenExpired.next(isExpired);
  }

  // Profile User name
  getProfileHeader(): Observable<any> {
    return this.updateProfileHeader;
  }
  setProfileHeader(updateProfile: boolean) {
    this.updateProfileHeader.next(updateProfile);
  }

  // Update global offer list
  getGlobalOfferList(): Observable<any> {
    return this.updateGlobalOfferList;
  }
  setGlobalOfferList(data: any) {
    this.updateGlobalOfferList.next(data);
  }

  // Update user wallet
  getUserWallet(): Observable<any> {
    return this.updateUserWallet;
  }
  setUserWallet(data: any) {
    this.updateUserWallet.next(data);
  }

  // Update user
  getUserSocket(): Observable<any> {
    return this.updateUserSocket;
  }
  setUserSocket(data: any) {
    this.updateUserSocket.next(data);
  }

  // Update ShoppingCart
  getShoppingCart(): Observable<any> {
    return this.updateShoppingCart;
  }
  setShoppingCart(data: any) {
    this.updateShoppingCart.next(data);
  }

  // refresh page Game

  getRefreshGame(): Observable<any> {
    return this.updateGame;
  }
  setRefreshGame(data: any) {
    this.updateGame.next(data);
  }

  // ====================================

  getRefreshGameMyCoinBonusDraw(): Observable<any> {
    return this.updateGameMyCoinBonusDraw;
  }
  setRefreshGameMyCoinBonusDraw(data: any) {
    this.updateGameMyCoinBonusDraw.next(data);
  }

  // =====================================
  getRefreshGameBonusDrawPercentage(): Observable<any> {
    return this.updatGameBonusDrawPercentage;
  }
  setRefreshGameBonusDrawPercentage(data: any) {
    this.updatGameBonusDrawPercentage.next(data);
  }

  // update patronage

  getListPatronage(): Observable<any> {
    return this.updateListPatronage;
  }
  setListPatronage(data: any) {
    this.updateListPatronage.next(data);
  }

  // Update Nouveua blog

  getGlobalBLogList(): Observable<any> {
    return this.updateGlobalBlogList;
  }
  setGlobalBLogList(data: any) {
    this.updateGlobalBlogList.next(data);
  }

  // Update fournisseur
  getGlobalProviderList(): Observable<any> {
    return this.updateGlobalProviderList;
  }
  setGlobalProviderList(data: any) {
    this.updateGlobalProviderList.next(data);
  }

  // Update Abonnement
  getSubscription(): Observable<any> {
    return this.updateSubscription;
  }
  setSubscription(data: any) {
    this.updateSubscription.next(data);
  }

  // Update Abonnement
  getBanner(): Observable<any> {
    return this.updateBanner;
  }
  setBanner(data: any) {
    this.updateBanner.next(data);
  }

  // Update UserBox
  getUserBox(): Observable<any> {
    return this.updateUserBox;
  }
  setUserBox(data: any) {
    this.updateUserBox.next(data);
  }

  // Update DailyReward
  getDailyReward(): Observable<any> {
    return this.updateDailyReward;
  }
  setDailyReward(data: any) {
    this.updateDailyReward.next(data);
  }

  // Update order
  getOrder(): Observable<any> {
    return this.updateListOrder;
  }
  setOrder(data: any) {
    this.updateListOrder.next(data);
  }

  // Stop spin circle game
  getStopSpinCircle(): Observable<any> {
    return this.stopSpinCircle;
  }
  setStopSpinCircle(data: any) {
    this.stopSpinCircle.next(data);
  }
}
