import { RabbitMQService } from "./modules/amqp/rabbit-mq";
import * as dotenv from 'dotenv';
import { SendToAddress } from "./modules/send-to-address/send-to-address.service";

dotenv.config();

const amqp = new RabbitMQService(String(process.env.AMQP));

export function consumer() {
  amqp.consume('trade', (new SendToAddress()).execute);
}