import { Request, Response } from "express";
import { ConfirmPayment } from "./modules/payments/services/confirm-payment";
import { PaymentService } from "./modules/payments/services/payments.service";

type Method = 'post' | 'get' | 'delete' | 'put';

export const routes: Array<{url: string, exec: any, method: Method }> = [
  {
    method: 'get',
    exec: (req: Request, res: Response) => { res.json({success: 'ok', time: new Date().getTime()}) },
    url: '/healf'
  },
  {
    method: 'post',
    exec: PaymentService.buyCrypto,
    url: '/buy/crypto'
  },
  {
    method: 'post',
    exec: (new ConfirmPayment()).execute,
    url: '/confirm/payment'
  },
];


