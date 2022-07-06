import { Sequelize } from "sequelize";

export class Connect {

  private static sequelize: Sequelize;

  private constructor() {
    Connect.sequelize  = new Sequelize({ dialect: 'sqlite', storage: './database/database.sqlite' , sync: { force: true } });
  }

  public static getIntance() {
    if(!this.sequelize) {
      new Connect();
      Connect.sequelize.sync();
    }

    return this.sequelize;
  }
  
}