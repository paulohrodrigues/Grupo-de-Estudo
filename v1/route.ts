import { PaymentService } from "./modules/payments/payments.service";

type Method = 'post' | 'get' | 'delete' | 'put';

export const routes: Array<{url: string, exec: any, method: Method }> = [
  {
    method: 'post',
    exec: PaymentService.buyCrypto,
    url: '/buy/crypto'
  },
];


