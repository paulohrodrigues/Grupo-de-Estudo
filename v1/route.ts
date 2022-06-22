import { Request, Response } from "express";

type Method = 'post' | 'get' | 'delete' | 'put';

export const routes: Array<{url: string, exec: any, method: Method }> = [
  {
    method: 'post',
    exec: buyCrypto,
    url: '/buy/crypto'
  },
];

function buyCrypto(req: Request, res: Response) {
  res.status(201).send('Hello');
}
