import { Request, Response } from "express";
import { ICreatePaymentInputDTO } from "./dtos/create-payment-input.dto";
import { CreatePayment } from "../../../../../@core/application/payments/create-payments.usecases";
import { ConfirmPayment } from "../../../../../@core/application/payments/confirm-payment.usecases";
import { PaymentRepository } from "../../../../../@core/infra/db/sequilize/payments/payment.repository";

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
        const paymentRepository = new PaymentRepository();

        const payment = await (new CreatePayment(paymentRepository)).execute(paymentInput);

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
    exec: async (req: Request, res: Response) => {
      const { referenceId } = req.body;
      
      try {
        const paymentRepository = new PaymentRepository();

        const payment = await (new ConfirmPayment(paymentRepository)).execute(referenceId);

        res.status(201).json(payment);
      } catch(error: any) {
        console.log(error);

        res.status(201).json({ status: 'error' });
      } 
    },
    url: '/confirm/payment'
  },
];


