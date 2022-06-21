import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { routes } from './route';

dotenv.config();

const app = express();
const port = process.env.PORT;

for(const route of routes) {
  app.post(route.url, (req: Request, res: Response) => {
    route.exec(req, res);
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});