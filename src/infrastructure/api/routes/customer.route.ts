import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address?.street,
        city: req.body.address?.city,
        number: req.body.address?.number,
        zip: req.body.address?.zip
      }
    }

    const output = await usecase.execute(customerDTO);

    res.status(201).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { customerRoute };
