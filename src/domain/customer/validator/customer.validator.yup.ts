import * as yup from 'yup'

import { ValidatorInterface } from '../../@shared/validator/validator.interface'
import { Customer } from '../entity/customer'

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(customer: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required").max(255, "Name is too long")
      })
      schema.validateSync(customer, { abortEarly: false })
    } catch (error) {
      const e = error as yup.ValidationError
      e.errors.forEach((err) => {
        customer.notification.addError({
          message: err,
          context: "Customer"
        })
      })
    }
  }
}
