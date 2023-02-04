import CustomerFactory from "../../../domain/customer/factory/custumer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 123, "12345", "City")
);
const customer2 = CustomerFactory.createWithAddress(
  "Jane",
  new Address("Street 2", 234, "23456", "City 2")
);

const makeMockCustomerRepository = (): CustomerRepositoryInterface => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
  };
};

describe("Unit tests for listing customer use cases", () => {
  it("should list the customers", async () => {
    const customerRepository = makeMockCustomerRepository();
    const listCustomer = new ListCustomerUseCase(customerRepository);
    const output = await listCustomer.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe("John");
    expect(output.customers[0].address.street).toBe("Street");

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe("Jane");
    expect(output.customers[1].address.street).toBe("Street 2");
  });
});
