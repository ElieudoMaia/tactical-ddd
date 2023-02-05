import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }

  changeName(name: string): void {
    this._name = name;
    this.validateName();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validatePrice();
  }

  validate() {
    if (!this._id || this._id.length === 0) {
      throw new Error("Id is required");
    }
    this.validateName();
    this.validatePrice();
  }

  private validateName(): void {
    if (!this._name) throw new Error("Name is required");
  }

  private validatePrice(): void {
    if (!this._price || this._price < 0)
      throw new Error("Price must be greater than zero");
  }
}
