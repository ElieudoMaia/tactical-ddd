import ProductFactory from '../../../domain/product/factory/product.factory';
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface';
import { ListProductsUsecase } from './list.product.usecase';

const product1 = ProductFactory.create("a", "Product 1", 10.0);
const product2 = ProductFactory.create("b", "Product 2", 20.0);

const makeMockProductRepository = (): ProductRepositoryInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
  };
};

describe("Unit tests for listing product use cases", () => {
  it("should list the products", async () => {
    const productRepository = makeMockProductRepository();
    const listproductsUseCase = new ListProductsUsecase(productRepository);
    const output = await listproductsUseCase.execute({});

    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
