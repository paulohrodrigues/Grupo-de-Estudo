import { Request, Response } from "express";

export const routes: Array<{url: string, exec: any }> = [
  {
    exec: buyCrypto,
    url: '/buy/crypto'
  },
];


function buyCrypto(req: Request, res: Response) {
  res.status(201).send('Express + TypeScript Server');
}