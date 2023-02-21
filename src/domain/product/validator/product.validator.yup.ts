import * as yup from "yup";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/product.interface";

export class ProductYupValidator
  implements ValidatorInterface<ProductInterface>
{
  validate(entity: ProductInterface): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup
          .number()
          .min(0, "Price must be greater than zero")
          .required("Price must be greater than zero"),
      });

      schema.validateSync(entity, { abortEarly: false });
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "Product",
        });
      });
    }
  }
}
