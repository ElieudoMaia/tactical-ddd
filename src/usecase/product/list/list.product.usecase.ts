import ProductInterface from '../../../domain/product/entity/product.interface';
import { ProductRepositoryInterface } from '../../../domain/product/repository/product-repository.interface';
import { InputListProductsDTO, OutputListProductsDTO } from './list.product.dto';

export class ListProductsUsecase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(_params: InputListProductsDTO): Promise<OutputListProductsDTO> {
    const products = await this.productRepository.findAll();
    return this.toOutputListProductsDTO(products);
  }

  private toOutputListProductsDTO(products: ProductInterface[]): OutputListProductsDTO {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
