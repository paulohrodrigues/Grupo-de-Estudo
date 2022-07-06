import amqplib = require('amqplib');
export class RabbitMQService {
  private amqplibInstance;

  constructor(uri: string) {
    this.amqplibInstance = amqplib
      .connect(uri)
      .then((conn) => conn.createChannel())
      .catch((err) => {
        console.error('error.amqp.connect', err);
      });
  }

  private setting(channel: any, key: string, msg: any) {
    return new Promise((resolve, reject) => {
      try {
        channel.assertQueue(key, { durable: true });
        channel.sendToQueue(key, Buffer.from(JSON.stringify(msg)));
        resolve(channel);
      } catch (err) {
        console.error('error.amqp.setting', err);
        reject(err);
      }
    });
  }

  public async sendQueue(key: string, msg: any) {
    return new Promise((resolve, reject) => {
      this.amqplibInstance
        .then((channel) => this.setting(channel, key, msg))
        .then((channel) => resolve(channel))
        .catch((err) => {
          console.error('error.amqp.queue', err);
          return reject(err);
        });
    });
  }
}
