import express, { Request, Response } from 'express';
import { routes } from './routes/payments/payment.controllers';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

for(const route of routes) {
  app[route.method](route.url, async (req: Request, res: Response) => {
    await route.exec(req, res);
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});