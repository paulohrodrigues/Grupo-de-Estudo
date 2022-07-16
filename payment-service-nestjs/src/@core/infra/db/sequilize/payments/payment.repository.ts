import { Payment } from "../../../../domain/payments/entities/payment.entity";
import { PaymentRepositoryInterface } from "../../../../domain/payments/repositories/payment.repository";
import { Payments } from '../../../../infra/db/sequilize/payments/payments.schema';

export class PaymentRepository implements PaymentRepositoryInterface {
  async create(paymentData: Payment): Promise<void> {
    const {
      fiatAmount, 
      address,
      firstName, 
      lastName,
      document,
      email,
      phone,
      state,
      urlPayment,
      reference,
    } = paymentData;

    await Payments.create({
      fiatAmount, 
      address,
      firstName, 
      lastName,
      document,
      email,
      phone,
      state,
      urlPayment,
      reference,
    });
  }

  async findByReferenceId(reference: string): Promise<Payment> {
    return <Payment>(await Payments.findOne({where: { reference }}))?.toJSON();
  }
  
  async updateByReferenceId(reference: string, dataUpdate: Partial<Payment>): Promise<void> {
    await Payments.update(dataUpdate, { where: { reference } });
  }
}