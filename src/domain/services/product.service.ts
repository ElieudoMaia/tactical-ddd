import { Product } from '../entities/product';

export default class ProductService {
  public static increasePrice(products: Product[], percentage: number) {
    products.forEach(product => {
      product.changePrice(product.price + (product.price * percentage / 100));
    });
  }
}
