import { Payment } from '../entities/payment.entity';

export interface PaymentRepositoryInterface {
  findByReferenceId(reference: string): Promise<Payment>;
  updateByReferenceId(reference: string, dataUpdate: Partial<Payment>): Promise<void>;
}