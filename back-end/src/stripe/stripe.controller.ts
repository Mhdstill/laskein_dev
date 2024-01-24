import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { CreateChargeDto } from './dto/create-charge.dto';
import { StripeService } from './stripe.service';

//@UseGuards(JwtGuard)
@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async saveCreditCard(@Body() creditCardDTO: CreateCardDto) {
    return this.stripeService.saveCard(
      creditCardDTO.payementMethodId,
      creditCardDTO.customerId,
    );
  }

  @Get()
  async getSavedCreditCard(@Request() req) {
    return this.stripeService.getSavedCards(req.customerId);
  }

  @Post('/charge')
  @UseGuards(JwtGuard)
  async charge(@Body() chargeDto: CreateChargeDto) {
    return this.stripeService.charge(
      chargeDto.amount,
      chargeDto.source,
      chargeDto.currency,
      chargeDto.description,
    );
  }
}
