const CryptoAccount = require('send-crypto');
import * as dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

const account = new CryptoAccount(privateKey, { network: "ropsten" });

export class SendToAddress {
  public execute(data: string) {
    const { amount, address } = JSON.parse(data);

    return new Promise(async (resolve) => {
      const txHash = await account
        .send(address, amount, "ETH")
        .on("transactionHash", console.log)
        .on("confirmation", console.log);

      console.log(txHash);

      resolve(txHash);
    });
  }
}
