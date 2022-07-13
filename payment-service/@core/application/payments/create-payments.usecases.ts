import dotenv from 'dotenv';
import validator from 'validator';
import { ConstructorInterface, PaymentRequestInterface, PaymentResponseInterface, Picpay } from 'picpay-sdk';
import { PaymentRepositoryInterface } from '../../domain/payments/repositories/payment.repository';
import { Payment } from '../../domain/payments/entities/payment.entity';
import { ICreatePaymentInputDTO } from '../../infra/express/routes/payments/dtos/create-payment-input.dto';
import { ICreatePaymentResponseDTO } from '../../infra/express/routes/payments/dtos/create-payment-response.dto';

dotenv.config();

const constructorInterface: ConstructorInterface = {
  picpayToken: String(process.env.PICPAY_TOKEN),
  sellerToken: String(process.env.SELLER_TOKEN)
} 

const picpay = new Picpay(constructorInterface)

export class CreatePayment {
  constructor(private paymentRepo: PaymentRepositoryInterface) {}

   public async execute(
    paymentInput: ICreatePaymentInputDTO,
  ): Promise<ICreatePaymentResponseDTO> {
    const {
      fiatAmount, 
      address,
      firstName, 
      lastName,
      document,
      email,
      phone,
    } = paymentInput;

    if(!validator.isEmail(email)){
      throw ('E-mail is not valid');
    }

    if(!validator.isTaxID(document, 'pt-BR')) {
      throw ('Document is not valid');
    }

    if(!validator.isNumeric(String(fiatAmount))) {
      throw ('Fiat amount is not valid');
    }

    const reference = (new Date()).getTime().toString();

    const requestParams: PaymentRequestInterface = {
      buyer: {
          document,
          email,
          firstName,
          lastName,
          phone,
      },
      value: fiatAmount,
      referenceId: reference,
      callbackUrl: String(process.env.WEBHOOK_PICPAY),
    };

    let responsePicpay: PaymentResponseInterface;

    try {
      responsePicpay = await  picpay.payment.request(requestParams);

      const payment = new Payment(
        fiatAmount,
        address,
        firstName,
        lastName,
        document,
        email,
        phone,
        'pending',
        responsePicpay.paymentUrl,
        reference,
      );

      await this.paymentRepo.create(payment);

    } catch(error) {
      throw ('Create payment error...');
    }

    return { paymentUrl: responsePicpay.paymentUrl };
  }
}

