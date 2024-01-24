import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlePhotoModule } from './article-photo/article-photo.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { BankModule } from './bank/bank.module';
import { BannerImageModule } from './banner-image/banner-image.module';
import { BoxArticleModule } from './box-article/box-article.module';
import { BoxImageModule } from './box-image/box-image.module';
import { BoxParamsModule } from './box-params/box-params.module';
import { BoxRewardLevelModule } from './box-reward-level/box-reward-level.module';
import { BoxTypeModule } from './box-type/box-type.module';
import { BoxModule } from './box/box.module';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';
import { DailyRewardModule } from './daily-reward/daily-reward.module';
import { EmailModule } from './email/email.module';
import { GameModule } from './game/game.module';
import { HistoricalModule } from './historical/historical.module';
import { MessageModule } from './message/message.module';
import { ModelsModule } from './models/models.module';
import { NewsLetterModule } from './news-letter/news-letter.module';
import { OfferModule } from './offer/offer.module';
import { OrderModule } from './order/order.module';
import { OuterTransactionModule } from './outer-transaction/outer-transaction.module';
import { PatronageModule } from './patronage/patronage.module';
import { PermissionModule } from './permission/permission.module';
import { PostModule } from './post/post.module';
import { PriceModule } from './price/price.module';
import { ProviderModule } from './provider/provider.module';
import { ReceiverModule } from './receiver/receiver.module';
import { RewardLevelModule } from './reward-level/reward-level.module';
import { RewardModule } from './reward/reward.module';
import { RoleModule } from './role/role.module';
import { SendMailModule } from './send-mail/send-mail.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { StripeModule } from './stripe/stripe.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TemoignageModule } from './temoignage/temoignage.module';
import { TransactionModule } from './transaction/transaction.module';
import { UnitySizeModule } from './unity-size/unity-size.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserBoxModule } from './user-box/user-box.module';
import { UserModule } from './user/user.module';
import { CleanupModule } from './utils/cron/cleanup/cleanup.module';
import { HelperModule } from './utils/helper/helper.module';
import { WalletModule } from './wallet/wallet.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: 'localhost',
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),
    ScheduleModule.forRoot(),
    HelperModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    UploadFileModule,
    SendMailModule,
    CleanupModule,
    HistoricalModule,
    AddressModule,
    NewsLetterModule,
    PatronageModule,
    TemoignageModule,
    MessageModule,
    ReceiverModule,
    BoxParamsModule,
    BannerImageModule,
    UserBoxModule,
    BoxTypeModule,
    BoxImageModule,
    PostModule,
    ProviderModule,
    ArticlePhotoModule,
    CategoryModule,
    SubCategoryModule,
    PriceModule,
    UnitySizeModule,
    ArticleModule,
    ShoppingCartModule,
    OrderModule,
    BankModule,
    TransactionModule,
    WalletModule,
    ChatModule,
    StripeModule,
    ModelsModule,
    BoxModule,
    SubscriptionModule,
    OfferModule,
    BoxArticleModule,
    GameModule,
    RewardModule,
    DailyRewardModule,
    RewardLevelModule,
    BoxRewardLevelModule,
    OuterTransactionModule,
    EmailModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
