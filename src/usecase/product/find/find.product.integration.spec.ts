import { Sequelize } from "sequelize-typescript";
import { Product } from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { FindProductUseCase } from './find.product.usecase';

describe("Teste find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product", 10.0);
    await productRepository.create(product);

    const input = { id: "123" };
    const output = await usecase.execute(input);

    const expectedOutput = {
      id: "123",
      name: "Product",
      price: 10.0,
    };

    expect(output).toEqual(expectedOutput);
  });
});
