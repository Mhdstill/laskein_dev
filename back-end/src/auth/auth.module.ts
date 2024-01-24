import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PatronageModule } from 'src/patronage/patronage.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RewardModule } from 'src/reward/reward.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { UserBoxModule } from 'src/user-box/user-box.module';
import { UserModule } from 'src/user/user.module';
import { SendMailModule } from '../send-mail/send-mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CodeConfirmTokenStrategy } from './strategies/codeConfirmToken.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
          },
        };
      },
    }),
    SendMailModule,
    StripeModule,
    UserBoxModule,
    RewardModule,
    PatronageModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    CodeConfirmTokenStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
