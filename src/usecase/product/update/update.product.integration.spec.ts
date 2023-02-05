import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProductDTO } from "./update.product.dto";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("Integration tests for update product", () => {
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

  it("should update the given product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = await ProductFactory.create("a", "John", 10);

    await productRepository.create(product);

    const input: InputUpdateProductDTO = {
      id: product.id,
      name: "Product Updated",
      price: 20,
    };
    const result = await updateProductUseCase.execute(input);
    expect(result).toEqual(input);
  });
});
