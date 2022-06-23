import { Payment } from "./modules/payments/payments";

type Method = 'post' | 'get' | 'delete' | 'put';

export const routes: Array<{url: string, exec: any, method: Method }> = [
  {
    method: 'post',
    exec: Payment.buyCrypto,
    url: '/buy/crypto'
  },
];


