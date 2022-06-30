import { Request, Response } from "express";
import { Payments } from "../interfaces/payments.entity";

export class ConfirmPayment {
  public async execute(req: Request, res: Response): Promise<void> {
    const { referenceId } = req.body;

    const payment = (await Payments.findOne({ where: { reference: referenceId } }));

    if(!payment) {
      console.log('Pagamento Não encontrado');

      res.status(201).json({ status: 'OK' });

      return;
    }

    await Payments.update({ state: 'confirmed' }, {where: { reference: referenceId }} );

    // (manda para fila)
  }
}