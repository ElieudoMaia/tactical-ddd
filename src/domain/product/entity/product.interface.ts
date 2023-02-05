export default interface ProductInterface {
  id: string;
  name: string;
  price: number;
  changeName(name: string): void;
  changePrice(price: number): void;
}
