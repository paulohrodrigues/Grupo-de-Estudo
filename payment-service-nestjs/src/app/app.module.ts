import { Module } from '@nestjs/common';
import { HealfModule } from '../healf/healf.module';
import { PaymentModule } from '../payment/payment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HealfModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
