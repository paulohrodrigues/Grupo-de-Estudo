import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { HealfService } from './healf.service';

@Controller('/healf')
export class HealfController {
  constructor(private readonly healfService: HealfService) {}

  @Get('/')
  healf(@Res() res: Response) {
    res.status(200).json(this.healfService.getHealf());
  }
}
