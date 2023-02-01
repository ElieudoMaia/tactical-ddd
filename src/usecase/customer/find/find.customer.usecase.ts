import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
