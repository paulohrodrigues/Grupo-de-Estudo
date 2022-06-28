import { DataTypes } from "sequelize";
import { Connect } from "../../database/connect";

const Payments = Connect.getIntance().define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fiatAmount: { type: DataTypes.NUMBER }, 
  address: { type:  DataTypes.STRING },
  firstName: { type:  DataTypes.STRING }, 
  lastName: { type:  DataTypes.STRING },
  document: { type:  DataTypes.STRING },
  email: { type:  DataTypes.STRING },
  phone: { type:  DataTypes.STRING },
  state: { type:  DataTypes.STRING },
  urlPayment: { type:  DataTypes.STRING },
});

export { Payments };