import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { FindProductUseCase } from './find.product.usecase';

const makeMockRepository = (): ProductRepositoryInterface => {
  const product = new Product("123", "Product", 10.0);
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit tests find product use case", () => {
  it("should find a product", async () => {
    const productRepository = makeMockRepository();
    const usecase = new FindProductUseCase(productRepository);
    const input = { id: "123" };
    const output = await usecase.execute(input);
    const expectedOutput = {
      id: "123",
      name: "Product",
      price: 10.0,
    };
    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error if no product was found", async () => {
    const productRepository = makeMockRepository();
    const usecase = new FindProductUseCase(productRepository);
    productRepository.find = jest
      .fn()
      .mockResolvedValueOnce(undefined);
    const input = { id: "123" };
    const promise = usecase.execute(input);
    await expect(promise).rejects.toThrow(new Error("Product not found"));
  });

  it("should throw an error if repository throws an error", async () => {
    const productRepository = makeMockRepository();
    const usecase = new FindProductUseCase(productRepository);
    productRepository.find = jest
      .fn()
      .mockRejectedValueOnce(new Error("Repository error"));
    const input = { id: "123" };
    const promise = usecase.execute(input);
    await expect(promise).rejects.toThrow(new Error("Repository error"));
  })
});
