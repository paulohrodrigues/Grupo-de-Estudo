import { Request, Response } from "express";

type Method = 'post' | 'get' | 'delete' | 'put';

export const routes: Array<{url: string, exec: any, method: Method }> = [
  {
    method: 'get',
    exec: (req: Request, res: Response) => { res.json({success: 'ok', time: new Date().getTime()}) },
    url: '/healf'
  },
];


