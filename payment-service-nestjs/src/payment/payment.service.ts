import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfirmPayment } from '../@core/application/payments/confirm-payment.usecases';
import { CreatePayment } from '../@core/application/payments/create-payments.usecases';
import { PaymentRepository } from '../@core/infra/db/sequilize/payments/payment.repository';
import { ICreatePaymentInputDTO } from './dtos/create-payment-input.dto';

@Injectable()
export class PaymentService {
  public async create(paymentInput: ICreatePaymentInputDTO) {
    try {
      const paymentRepository = new PaymentRepository();

      const payment = await new CreatePayment(paymentRepository).execute(
        paymentInput,
      );

      return payment;
    } catch (error: any) {
      if (!error?.message) {
        throw new InternalServerErrorException({ error: 'Internal Error' });
      }

      throw new BadRequestException({ error: error.message });
    }
  }

  public async confirm({ referenceId }: { referenceId: string }) {
    try {
      const paymentRepository = new PaymentRepository();

      const payment = await new ConfirmPayment(paymentRepository).execute(
        referenceId,
      );

      return payment;
    } catch (error: any) {
      console.log(error);

      return { status: 'error' };
    }
  }
}
