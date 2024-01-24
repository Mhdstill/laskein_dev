import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailDto } from 'src/auth/dto/reset.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class SendMailService {
  @Inject(ConfigService)
  public config: ConfigService;

  constructor(private mailerService: MailerService) {}

  async sendMailToConfirmLogin(userInfo: CreateUserDto, uuid: string) {
    const mailFrom: string = this.config.get('MAIL_FROM');
    return await this.mailerService.sendMail({
      to: userInfo.email,
      from: mailFrom,
      subject: 'Laskein - Code de confirmation ✔',
      template: 'validate-login',
      context: {
        uuid: uuid,
        name: userInfo.firstName,
      },
    });
  }

  async sendMailToConfirmRegister(userInfo: any, uuid: string) {
    const mailFrom: string = this.config.get('MAIL_FROM');
    return await this.mailerService.sendMail({
      to: userInfo.email,
      from: mailFrom,
      subject: 'Laskein - Confirmation adresse mail ✔',
      template: 'validate-register',
      context: {
        uuid: uuid,
        name: userInfo.firstName,
      },
    });
  }

  async sendMailToWelcomeMessage(userInfo: any, uuid: string) {
    const mailFrom: string = this.config.get('MAIL_FROM');
    return await this.mailerService.sendMail({
      to: userInfo.email,
      from: mailFrom,
      subject: 'Laskein - welcome message ✔',
      template: 'welcome-message',
      context: {
        uuid: uuid,
        name: userInfo.firstName,
      },
    });
  }

  async sendMailToNewsletterSubscriber(email: string) {
    const mailFrom: string = this.config.get('MAIL_FROM');
    return await this.mailerService.sendMail({
      to: email,
      from: mailFrom,
      subject: 'Laskein - newsletter subscriber ✔',
      template: 'welcome-message',
    });
  }

  async sendMailToResetPassword(emailDto: EmailDto, token: string) {
    const mailFrom: string = this.config.get('MAIL_FROM');
    return await this.mailerService.sendMail({
      to: emailDto.email,
      from: mailFrom,
      subject: 'Laskein - Réinitialiser le mot de passe ✔',
      template: 'password-reset',
      context: {
        url: `${emailDto.url}?token=${token}`,
      },
    });
  }
}
