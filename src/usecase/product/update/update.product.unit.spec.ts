import ProductFactory from "../../../domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO } from "./update.product.dto";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("a", "John", 10);

const input: InputUpdateProductDTO = {
  id: product.id,
  name: "Product Updated",
  price: 20,
};

const makeMockRepository = (): ProductRepositoryInterface => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockResolvedValue(input),
  };
};

describe("Unit tests for product update", () => {
  it("should update a product", async () => {
    const productRepository = makeMockRepository();
    const updateProduct = new UpdateProductUseCase(productRepository);
    const result = await updateProduct.execute(input);
    expect(result).toEqual(input);
  });

  it("should throw an error if product does not exists", async () => {
    const productRepository = makeMockRepository();
    productRepository.find = jest.fn().mockResolvedValueOnce(null);
    const updateProduct = new UpdateProductUseCase(productRepository);
    const inputWithWrongId = { ...input, id: "wrongId" };
    await expect(updateProduct.execute(inputWithWrongId)).rejects.toThrow(
      "Product not found"
    );
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = makeMockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const inputWithNoName = { ...input, name: "" };
    await expect(updateProductUseCase.execute(inputWithNoName)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = makeMockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const inputWithNoPrice = { ...input, price: 0 };
    await expect(
      updateProductUseCase.execute(inputWithNoPrice)
    ).rejects.toThrow("Price must be greater than zero");
  });
});
