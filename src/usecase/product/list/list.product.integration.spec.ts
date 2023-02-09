import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ListProductsUsecase } from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration tests find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list the products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductsUsecase(productRepository);

    const product1 = new Product("1", "Product 1", 10.0);
    const product2 = new Product("2", "Product 2", 20.0);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await usecase.execute({});
    expect(output).toBeDefined();
    expect(output.products).toBeDefined();
    expect(output.products.length).toBe(2);
    expect(output.products[0]).toEqual({ id: "1", name: "Product 1", price: 10.0 });
    expect(output.products[1]).toEqual({ id: "2", name: "Product 2", price: 20.0 });
  });
});
