export class Product {
  private _id: string;
  private _name: string;
  private _price: number = 0;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): void {
    if (!this._id) throw new Error("Id is required");
    if (!this._name) throw new Error("Name is required");
    if (this._price < 0) throw new Error("Price must be greater than zero");
  }

  public changeName(name: string): void {
    this._name = name;
  }

  public changePrice(price: number): void {
    this._price = price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
