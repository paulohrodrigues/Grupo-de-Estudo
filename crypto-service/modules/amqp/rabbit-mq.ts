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

  private settingSend(channel: any, key: string, msg: any) {
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

  private settingConsume(channel: any, key: string, callback: any) {
    return new Promise((resolve, reject) => {
      try {
        channel.assertQueue(key, { durable: true });

        channel.consume(key, (msg: any) => {
          if (msg !== null) {
            callback(msg.content.toString()).then(()=> {
              channel.ack(msg);
            });
          } else {
            console.error('Consumer cancelled by server');
          }
        });

        resolve(channel);
      } catch (err) {
        console.error('error.amqp.setting.consume', err);
        reject(err);
      }
    });
  }

  public async sendQueue(key: string, msg: any) {
    return new Promise((resolve, reject) => {
      this.amqplibInstance
        .then((channel) => this.settingSend(channel, key, msg))
        .then((channel) => resolve(channel))
        .catch((err) => {
          console.error('error.amqp.queue', err);
          return reject(err);
        });
    });
  }

  public async consume(key: string, callback: any) {
    return new Promise((resolve, reject) => {
      this.amqplibInstance
        .then((channel) => this.settingConsume(channel, key, callback))
        .then((channel) => resolve(channel))
        .catch((err) => {
          console.error('error.amqp.queue', err);
          return reject(err);
        });
    });
  }
}
