import { Module } from '@nestjs/common';
import { HealfController } from './healf.controller';
import { HealfService } from './healf.service';

@Module({
  controllers: [HealfController],
  providers: [HealfService],
})
export class HealfModule {}
