import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from './find.customer.usecase';

describe("Teste find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const costumerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(costumerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("street", 123, "12345", "City");
    customer.changeAddress(address);

    await costumerRepository.create(customer);

    const input = {
      id: "123",
    };

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
});
