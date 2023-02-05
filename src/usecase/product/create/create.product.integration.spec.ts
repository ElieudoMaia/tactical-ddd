import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

describe("Integration tests for creating product", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new CreateProductUseCase(productRepository);
    const input = {
      name: "Product",
      price: 10,
    };
    const expectedOutput = {
      id: expect.any(String),
      name: "Product",
      price: 10,
    };
    const output = await productUseCase.execute(input);
    expect(output).toEqual(expectedOutput);
  });
});
