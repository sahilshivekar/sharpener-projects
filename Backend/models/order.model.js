import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./user.model.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
    defaultValue: "PENDING",
  },
});

Order.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Order, { foreignKey: "userId" });

export default Order;
