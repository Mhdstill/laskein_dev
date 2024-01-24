import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { SOCKET_SERVER } from 'src/app/app.module';
import { SharedDataService } from 'src/app/config/shared-data-service';

@Injectable({
  providedIn: 'root',
})
export class GlobalSocketService {
  private socketProtocol = {
    transports: ['websocket', 'polling'],
  };

  // refresh Provider

  constructor(private sharedDataService: SharedDataService) {
    this.refreshGlobalOfferList();
    this.refreshUserProfileInfo();
    this.refreshUserProfile();
    this.refreshPageShoppingCart();
    this.refreshGame();
    this.refreshGameMyCoinBonusDraw();
    this.refreshGameBonusDrawPercentage();
    this.refreshGlobalBlogList();
    this.refreshGlobalProviderList();
    this.refreshBanner();
    this.refreshUserBox();
    this.refreshDailyReward();
    this.stopSpinCircle();
    this.refreshListPatronage();
    this.refreshOrder();
  }

  //  refresh offer

  refreshGlobalOfferList() {
    const socketGlobalOffer = io(`${SOCKET_SERVER}/offer`, this.socketProtocol);
    socketGlobalOffer.on('sync-list-offer', (data: any) => {
      this.sharedDataService.setGlobalOfferList(undefined);
    });
  }

  //  refresh userProfil

  refreshUserProfileInfo() {
    const socketUserProfile = io(
      `${SOCKET_SERVER}/wallet`,
      this.socketProtocol
    );
    socketUserProfile.on('sync-list-wallet', (data: any) => {
      this.sharedDataService.setUserWallet(undefined);
    });
  }

  //  refresh userProfil

  refreshUserProfile() {
    const socketUserProfile = io(`${SOCKET_SERVER}/user`, this.socketProtocol);
    socketUserProfile.on('sync-list-user', (data: any) => {
      this.sharedDataService.setUserSocket(undefined);
      // console.log('testetete  dgggggggggggggggggg');
    });
  }

  //  shoppingCart

  refreshPageShoppingCart() {
    const socketPageShoppingCart = io(
      `${SOCKET_SERVER}/shopping-cart`,
      this.socketProtocol
    );
    socketPageShoppingCart.on('sync-list-shopping-cart', (data: any) => {
      this.sharedDataService.setShoppingCart(undefined);
      console.log(' socket shopping cart ==========================');
    });
  }

  //  refresh Game

  refreshGame() {
    const socketPageGame = io(`${SOCKET_SERVER}/game`, this.socketProtocol);
    socketPageGame.on('finished-game', (data: any) => {
      this.sharedDataService.setRefreshGame(undefined);
    });
  }

  refreshGameMyCoinBonusDraw() {
    const socketPageGameMyCoinBonusDraw = io(
      `${SOCKET_SERVER}/game`,
      this.socketProtocol
    );
    socketPageGameMyCoinBonusDraw.on(
      'finished-game-my-coin-bonus-draw',
      (data: any) => {
        this.sharedDataService.setRefreshGameMyCoinBonusDraw(undefined);
      }
    );
  }
  refreshGameBonusDrawPercentage() {
    const socketPageGameBonusDrawPercentage = io(
      `${SOCKET_SERVER}/game`,
      this.socketProtocol
    );
    socketPageGameBonusDrawPercentage.on(
      'finished-game-bonus-draw-percentage',
      (data: any) => {
        this.sharedDataService.setRefreshGameBonusDrawPercentage(undefined);
      }
    );
  }

  // refresh patronage

  refreshListPatronage() {
    const socketListPatronage = io(
      `${SOCKET_SERVER}/patronage`,
      this.socketProtocol
    );
    socketListPatronage.on('sync-list-patronage', (data: any) => {
      this.sharedDataService.setListPatronage(undefined);
    });
  }

  // refresh Nouveau blog

  refreshGlobalBlogList() {
    const socketGlobalBlog = io(`${SOCKET_SERVER}/post`, this.socketProtocol);
    socketGlobalBlog.on('sync-list-post', (data: any) => {
      this.sharedDataService.setGlobalBLogList(undefined);
    });
  }

  // refresh Provider

  refreshGlobalProviderList() {
    const socketGlobalProvider = io(
      `${SOCKET_SERVER}/provider`,
      this.socketProtocol
    );
    socketGlobalProvider.on('sync-list-provider', (data: any) => {
      this.sharedDataService.setGlobalProviderList(undefined);
    });
  }

  // Refresh abonnement

  refreshSubscription() {
    const socketSubscription = io(
      `${SOCKET_SERVER}/subscription`,
      this.socketProtocol
    );
    socketSubscription.on('sync-list-subscription', (data: any) => {
      this.sharedDataService.setSubscription(undefined);
    });
  }

  // Refresh abonnement

  refreshBanner() {
    const socketBanner = io(
      `${SOCKET_SERVER}/banner-image`,
      this.socketProtocol
    );
    socketBanner.on('sync-list-banner-image', (data: any) => {
      this.sharedDataService.setBanner(undefined);
    });
  }

  // Refresh UserBox

  refreshUserBox() {
    const socketUserBox = io(`${SOCKET_SERVER}/user-box`, this.socketProtocol);
    socketUserBox.on('sync-list-user-box', (data: any) => {
      this.sharedDataService.setUserBox(undefined);
      // console.log('testetete  dgggggggggggggggggg');
    });
  }

  // Refresh DailyReward

  refreshDailyReward() {
    const socketDailyReward = io(
      `${SOCKET_SERVER}/daily-reward`,
      this.socketProtocol
    );
    socketDailyReward.on('sync-list-daily-reward', (data: any) => {
      this.sharedDataService.setDailyReward(undefined);
    });
  }

  refreshOrder() {
    const socketOrder = io(`${SOCKET_SERVER}/order`, this.socketProtocol);
    socketOrder.on('sync-list-order', (data: any) => {
      this.sharedDataService.setOrder(undefined);
    });
  }

  // Run spin circle game
  stopSpinCircle() {
    const socketStopSpinCircle = io(
      `${SOCKET_SERVER}/game`,
      this.socketProtocol
    );
    socketStopSpinCircle.on('sync-list-game', (data: any) => {
      this.sharedDataService.setStopSpinCircle(data);
    });
  }
}
