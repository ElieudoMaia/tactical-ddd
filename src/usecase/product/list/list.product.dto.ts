export interface InputListProductsDTO {}

interface ProductDTO {
  id: string;
  name: string;
  price: number;
}

export interface OutputListProductsDTO {
  products: ProductDTO[];
}
