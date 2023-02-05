import ProductFactory from "../../../domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from "./create.product.dto";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create("a", input.name, input.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
