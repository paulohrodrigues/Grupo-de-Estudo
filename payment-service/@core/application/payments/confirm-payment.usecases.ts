import { Request, Response } from "express";
import { RabbitMQService } from "../../infra/amqp/rabbit-mq";
import dotenv from 'dotenv';
import { PaymentRepositoryInterface } from "../../domain/payments/repositories/payment.repository";
dotenv.config();

const AMQP = new RabbitMQService(String(process.env.AMQP));

export class ConfirmPayment {
  constructor(private paymentRepo: PaymentRepositoryInterface) {}

  public async execute(req: Request, res: Response): Promise<void> {
    const { referenceId } = req.body;

    const payment = await this.paymentRepo.findByReferenceId(referenceId);

    if(!payment) {
      console.log('Pagamento Não encontrado');

      res.status(201).json({ status: 'OK' });

      return;
    }

    if(payment.state === 'confirmed') {
      console.log('Pagamento Já efetivado');

      res.status(201).json({ status: 'OK' });

      return;
    }
    //Check if payment confirmed with successful

    await this.paymentRepo.updateByReferenceId(referenceId, { state: 'confirmed' });

    await AMQP.sendQueue('trade', {
      action: 'trade',
      address: payment.address,
      amount: payment.fiatAmount,
    });
  }
}
