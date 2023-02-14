import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductsUsecase } from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from "../../product/repository/sequelize/product.repository";

const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDTO = {
      name: req.body.name,
      price: Number(req.body.price),
    };

    const output = await usecase.execute(productDTO);

    res.status(201).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductsUsecase(new ProductRepository());
  try {
    const output = await usecase.execute({});
    res.status(200).json(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { productRoute };
