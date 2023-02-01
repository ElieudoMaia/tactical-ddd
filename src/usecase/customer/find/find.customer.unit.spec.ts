import { Customer } from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const makeMockRepository = (): CustomerRepositoryInterface => {
  const customer = new Customer("123", "John");
  const address = new Address("street", 123, "12345", "City");
  customer.changeAddress(address);

  return {
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find customer use case", () => {
  it("should find a customer", async () => {
    const costumerRepository = makeMockRepository();
    const usecase = new FindCustomerUseCase(costumerRepository);

    const input = { id: "123" };
    const output = await usecase.execute(input);

    const expectedOutput = {
      id: "123",
      name: "John",
      address: {
        street: "street",
        number: 123,
        zip: "12345",
        city: "City",
      },
    };

    expect(output).toEqual(expectedOutput);
  });

  it("should not found a customer and throws an error", async () => {
    const costumerRepository = makeMockRepository();
    const usecase = new FindCustomerUseCase(costumerRepository);
    costumerRepository.find = jest
      .fn()
      .mockRejectedValueOnce(new Error("Customer not found"));
    const input = { id: "123" };
    const promise = usecase.execute(input);
    await expect(promise).rejects.toThrow(new Error("Customer not found"));
  });
});
