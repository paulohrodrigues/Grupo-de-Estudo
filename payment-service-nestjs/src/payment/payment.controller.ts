import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ICreatePaymentInputDTO } from './dtos/create-payment-input.dto';
import { PaymentService } from './payment.service';

@Controller('')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/buy/crypto')
  public async create(
    @Body() body: ICreatePaymentInputDTO,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.CREATED).json(await this.paymentService.create(body));
  }

  @Post('/confirm/payment')
  public async confirm(
    @Body() body: { referenceId: string },
    @Res() res: Response,
  ) {
    res
      .status(HttpStatus.CREATED)
      .json(await this.paymentService.confirm(body));
  }
}
