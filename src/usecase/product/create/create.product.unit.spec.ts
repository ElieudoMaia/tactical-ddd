import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product",
  price: 10,
};

const makeMockProductRepository = (): ProductRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for creating product", () => {
  it("should create a product", async () => {
    const productRepository = makeMockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const expectedOutput = {
      id: expect.any(String),
      name: "Product",
      price: 10,
    };
    const output = await createProductUseCase.execute(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = makeMockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const inputWithNoName = { ...input, name: "" };
    await expect(createProductUseCase.execute(inputWithNoName)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is less than 0", async () => {
    const productRepository = makeMockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const inputWithNoPrice = { ...input, price: -1 };
    await expect(
      createProductUseCase.execute(inputWithNoPrice)
    ).rejects.toThrow("Price must be greater than zero");
  });

  it("should throw an error if repository throws an error", async () => {
    const productRepository = makeMockProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    productRepository.create = jest.fn(() => {
      throw new Error("Any Repo Error");
    });
    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Any Repo Error"
    );
  });
});
