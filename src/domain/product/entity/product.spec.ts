import { Product } from "./product";

describe("Product Unit Tests", () => {
  it("", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw an error when id and name are empty", () => {
    expect(() => {
      const product = new Product("", "", 100);
    }).toThrowError("Product: Id is required, Product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should throw an error when change to an empty name", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrowError("Product: Name is required");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should throw an error when change to a negative price", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(-1);
    }).toThrowError("Product: Price must be greater than zero");
  });
});
