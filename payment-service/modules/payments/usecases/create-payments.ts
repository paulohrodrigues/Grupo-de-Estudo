import dotenv from 'dotenv';
import validator from 'validator';
import { ConstructorInterface, PaymentRequestInterface, PaymentResponseInterface, Picpay } from 'picpay-sdk';
import { Payments } from '../interfaces/payments.entity';
import { ICreatePaymentInputDTO } from "../interfaces/create-payment-input.dto";
import { ICreatePaymentResponseDTO } from "../interfaces/create-payment-response.dto";

dotenv.config();

const constructorInterface: ConstructorInterface = {
  picpayToken: String(process.env.PICPAY_TOKEN),
  sellerToken: String(process.env.SELLER_TOKEN)
} 

const picpay = new Picpay(constructorInterface)

export class CreatePayment {
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
      callbackUrl: 'https://247a-45-237-93-44.sa.ngrok.io/confirm/payment',
    };

    let responsePicpay: PaymentResponseInterface;

    try {
      responsePicpay = await  picpay.payment.request(requestParams);

      await Payments.create({
        fiatAmount, 
        address,
        firstName, 
        lastName,
        document,
        email,
        phone,
        state: 'pending',
        urlPayment: responsePicpay.paymentUrl,
        reference,
      });

    } catch(error) {
      throw ('Create payment error...');
    }

    return { paymentUrl: responsePicpay.paymentUrl };
  }
}

