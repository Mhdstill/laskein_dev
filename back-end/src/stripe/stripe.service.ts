import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createCustomer(name: string, email: string) {
    try {
      const createCustomer = this.stripe.customers.create({
        name,
        email,
      });
      return createCustomer;
    } catch (error) {
      throw error;
    }
  }

  public async charge(
    amount: number,
    source: string,
    currency: string,
    description: string,
  ) {
    try {
      const createdCharge = await this.stripe.charges.create({
        amount,
        currency,
        source,
        description,
      });

      return createdCharge;
    } catch (error) {
      throw error;
    }
  }

  public async saveCard(paymentMethodId: string, customerId: string) {
    try {
      const savedCard = this.stripe.setupIntents.create({
        customer: customerId,
        payment_method: paymentMethodId,
      });

      return savedCard;
    } catch (error) {
      throw error;
    }
  }

  public async getSavedCards(customerId: string) {
    try {
      return this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });
    } catch (error) {
      throw error;
    }
  }

  public async createBankToken(
    aaNumber: string,
    country: string,
    currency: string,
    routing_number: string,
    account_holder_name: string,
  ) {
    try {
      const bankAcount = await this.stripe.tokens.create({
        bank_account: {
          account_number: aaNumber,
          country: country,
          currency: currency,
          account_holder_name: account_holder_name,
          routing_number: routing_number,
        },
      });
      return bankAcount;
    } catch (error) {
      throw error;
    }
  }
}
