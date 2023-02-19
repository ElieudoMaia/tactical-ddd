import { NotificationError } from "../../../domain/@shared/notification/notification.error";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "street",
    number: 123,
    zip: "12345",
    city: "City",
  },
};

const makeMockRepository = (): CustomerRepositoryInterface => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test Create customer use case", () => {
  test("should create a customer", async () => {
    const customerRepository = makeMockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    const expectedOutput = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    };
    const output = await createCustomerUseCase.execute(input);
    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = makeMockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    const inputWithNoName = { ...input, name: "" };
    await expect(
      createCustomerUseCase.execute(inputWithNoName)
    ).rejects.toThrowError(
      new NotificationError([
        { message: "Name is required", context: "Customer" },
      ])
    );
  });

  it("should throw an error when address.street is missing", async () => {
    const customerRepository = makeMockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    const inputWithNoName = {
      ...input,
      address: { ...input.address, street: "" },
    };
    await expect(
      createCustomerUseCase.execute(inputWithNoName)
    ).rejects.toThrow("Street is required");
  });
});
