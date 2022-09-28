import { Product } from '../entities/product';
import ProductService from './product.service';

describe('Product services unit tests', () => {
  it('Should change the price of all products', () => {
    const product1 = new Product('product1','Product 1', 10);
    const product2 = new Product('product2','Product 2', 20);
    const products = [product1, product2];
    ProductService.increasePrice(products, 100);
    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  })
})
