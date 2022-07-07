import { Request, Response } from "express";
import { RabbitMQService } from "../../amqp/rabbit-mq";
import { Payments } from "../interfaces/payments.entity";
import dotenv from 'dotenv';
dotenv.config();

const AMQP = new RabbitMQService(String(process.env.AMQP));

export class ConfirmPayment {
  public async execute(req: Request, res: Response): Promise<void> {
    const { referenceId } = req.body;

    const payment = (await Payments.findOne({ where: { reference: referenceId } }))?.toJSON();

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

    await Payments.update({ state: 'confirmed' }, {where: { reference: referenceId }} );

    await AMQP.sendQueue('trade', {
      action: 'trade',
      address: payment.address,
      amount: payment.fiatAmount,
    });
  }
}
