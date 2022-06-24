import { Request, Response } from "express";
import dotenv from 'dotenv';
import validator from 'validator';
import { ConstructorInterface, PaymentRequestInterface, Picpay } from 'picpay-sdk';

dotenv.config();

const constructorInterface: ConstructorInterface = {
  picpayToken: String(process.env.PICPAY_TOKEN),
  sellerToken: String(process.env.SELLER_TOKEN)
} 

console.log(constructorInterface)
console.log(process.env.PORT)

const picpay = new Picpay(constructorInterface)

export class Payment {
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

    const requestParams: PaymentRequestInterface = {
      buyer: {
          document,
          email,
          firstName,
          lastName,
          phone,
      },
      value: fiatAmount,
      referenceId: (new Date()).getTime().toString() ,
      callbackUrl: 'https://callback',
    };

    await picpay.payment.request(requestParams).then((data)=>{ console.log(data) }).catch((err)=>{ console.log(err) });

    res.status(201).send('Send with successful ');
  }
}

