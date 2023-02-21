import { ValidatorInterface } from '../../@shared/validator/validator.interface';
import ProductInterface from '../entity/product.interface';
import { ProductYupValidator } from '../validator/product.validator.yup';

export class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductInterface> {
    return new ProductYupValidator();
  }
}
