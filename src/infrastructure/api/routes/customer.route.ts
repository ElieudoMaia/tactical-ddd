import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { CustomerPresenter } from '../presenters/customer.presenter';

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

customerRoute.get("/", async (req: Request, res: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});

    res.format({
      json: () => res.status(200).json(output),
      xml: () => res.status(200).send(CustomerPresenter.listToXML(output))
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

export { customerRoute };
