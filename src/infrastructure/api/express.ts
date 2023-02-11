import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./routes/customer.route";

const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);

let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    models: [CustomerModel],
  });
  await sequelize.sync();
  await sequelize.authenticate();
}

setupDb();

export { app, sequelize };
