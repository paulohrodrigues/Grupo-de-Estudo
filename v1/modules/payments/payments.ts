import { Request, Response } from "express";
import validator from 'validator';

export class Payment {

   public static buyCrypto(req: Request, res: Response): void {

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

    res.status(201).send('Send with successful ');
  }
}

