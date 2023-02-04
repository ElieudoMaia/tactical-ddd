import CustomerFactory from "../../../domain/customer/factory/custumer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 123, "12345", "City")
);

const input = {
  id: customer.id,
  name: customer.name,
  address: {
    street: "Street Updated",
    number: 123,
    zip: "12345",
    city: "City",
  },
};

const makeMockRepository = (): CustomerRepositoryInterface => {
  return {
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockResolvedValue(input),
  };
};

describe("Unit test for update customer use case", () => {
  test("should update a customer", async () => {
    const customerRepository = makeMockRepository();
    const updateCustomer = new UpdateCustomerUseCase(customerRepository);
    const result = await updateCustomer.execute(input);
    expect(result).toEqual(input);
  });

  test("should thorw an error if customer does not exists", async () => {
    const customerRepository = makeMockRepository();
    customerRepository.find = jest.fn().mockResolvedValueOnce(null);
    const updateCustomer = new UpdateCustomerUseCase(customerRepository);
    const inputWithWrongId = { ...input, id: "wrongId" };
    await expect(updateCustomer.execute(inputWithWrongId)).rejects.toThrow(
      "Customer not found"
    );
  });

  test("should throw an error when name is missing", async () => {
    const customerRepository = makeMockRepository();
    const updateCustomer = new UpdateCustomerUseCase(customerRepository);
    const inputWithNoName = { ...input, name: "" };
    await expect(updateCustomer.execute(inputWithNoName)).rejects.toThrow(
      "Name is required"
    );
  });

  test("should throw an error when address.street is missing", async () => {
    const customerRepository = makeMockRepository();
    const updateCustomer = new UpdateCustomerUseCase(customerRepository);
    const inputWithNoStreet = {
      ...input,
      address: { ...input.address, street: "" },
    };
    await expect(updateCustomer.execute(inputWithNoStreet)).rejects.toThrow(
      "Street is required"
    );
  });
});
