export class SendToAddress {
  public execute(data: string) {
    const { amount, address } = JSON.parse(data);

    return new Promise((resolve) => {
      // send crypt to client

      console.log('amount ', amount);

      console.log('address ', address);
      
      resolve(true);
    });
  }
}
