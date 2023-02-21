import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/list/list.customer.dto";

export class CustomerPresenter {
  static listToXML(data: OutputListCustomerDTO): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: data.customers.map((customer) => ({
          customer: {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              number: customer.address.number,
              zip: customer.address.zip,
            },
          },
        })),
      },
      xmlOptions
    );
  }
}
