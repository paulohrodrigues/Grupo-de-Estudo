import { Request, Response } from "express";
import { ICreatePaymentInputDTO } from "./modules/payments/interfaces/create-payment-input.dto";
import { ConfirmPayment } from "./modules/payments/usecases/confirm-payment";
import { CreatePayment } from "./modules/payments/usecases/create-payments";

type Method = 'post' | 'get' | 'delete' | 'put';

export const routes: Array<{url: string, exec: any, method: Method }> = [
  {
    method: 'get',
    exec: (req: Request, res: Response) => { res.json({success: 'ok', time: new Date().getTime()}) },
    url: '/healf'
  },
  {
    method: 'post',
    exec: async (req: Request, res: Response) => {
      const paymentInput: ICreatePaymentInputDTO = req.body;
      
      try {
        const payment = await (new CreatePayment()).execute(paymentInput);

        res.status(201).json(payment);
      } catch(error: any) {
        if(!error?.message) {
          res.status(500).json({ error: 'Internal Error' });
        }

        res.status(400).json({ error: error.message });
      } 
    },
    url: '/buy/crypto'
  },
  {
    method: 'post',
    exec: (new ConfirmPayment()).execute,
    url: '/confirm/payment'
  },
];


