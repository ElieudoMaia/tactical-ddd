export interface InputListCustomerDTO {}

type CustomerDTO = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
};

export interface OutputListCustomerDTO {
  customers: CustomerDTO[];
}
