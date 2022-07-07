import { Request, Response } from "express";
import dotenv from 'dotenv';
import validator from 'validator';
import { ConstructorInterface, PaymentRequestInterface, PaymentResponseInterface, Picpay } from 'picpay-sdk';
import { Payments } from '../interfaces/payments.entity';

dotenv.config();

const constructorInterface: ConstructorInterface = {
  picpayToken: String(process.env.PICPAY_TOKEN),
  sellerToken: String(process.env.SELLER_TOKEN)
} 

const picpay = new Picpay(constructorInterface)

export class PaymentService {
   public static async buyCrypto(req: Request, res: Response): Promise<void> {

    const {
      fiatAmount, 
      address,
      firstName, 
      lastName,
      document,
      email,
      phone,
    } = req.body;

    if(!validator.isEmail(email)){
      res.status(400).send('E-mail is not valid');
    }

    if(!validator.isTaxID(document, 'pt-BR')){
      res.status(400).send('Document is not valid');
    }

    if(!validator.isNumeric(fiatAmount)){
      res.status(400).send('Fiat amount is not valid');
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
      res.status(400).json({ error: 'Create payment error...'});

      return;
    }

    res.status(201).json({ paymentUrl: responsePicpay.paymentUrl });
  }
}

