import { Product } from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../entity/product.interface";

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
