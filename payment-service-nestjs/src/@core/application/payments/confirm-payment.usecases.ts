import { RabbitMQService } from "../../infra/amqp/rabbit-mq";
import * as dotenv from 'dotenv';
import { PaymentRepositoryInterface } from "../../domain/payments/repositories/payment.repository";
dotenv.config();

const AMQP = new RabbitMQService(String(process.env.AMQP));

export class ConfirmPayment {
  constructor(private paymentRepo: PaymentRepositoryInterface) {}

  public async execute(referenceId: string): Promise<{ status: string }> {

    const payment = await this.paymentRepo.findByReferenceId(referenceId);

    if(!payment) {
      console.log('Pagamento Não encontrado');

      return { status: 'OK' };
    }

    if(payment.state === 'confirmed') {
      console.log('Pagamento Já efetivado');

      return { status: 'OK' };
    }
    //Check if payment confirmed with successful

    await this.paymentRepo.updateByReferenceId(referenceId, { state: 'confirmed' });

    await AMQP.sendQueue('trade', {
      action: 'trade',
      address: payment.address,
      amount: payment.fiatAmount,
    });

    return { status: 'OK' };
  }
}
