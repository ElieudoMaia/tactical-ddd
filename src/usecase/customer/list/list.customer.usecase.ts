import { Customer } from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from "./list.customer.dto";

export class ListCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return this.toOutputListCustomerDTO(customers);
  }

  private toOutputListCustomerDTO(
    customers: Customer[]
  ): OutputListCustomerDTO {
    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    };
  }
}
