import OrderItem from "./order-item";

export class Order {
  public _id: string;
  public _costumerId: string;
  _items: OrderItem[] = [];

  constructor(id: string, costumerId: string, items: OrderItem[]) {
    this._id = id;
    this._costumerId = costumerId;
    this._items = items;
    this.validate()
  }

  private validate() {
    if (!this._id) throw new Error("Id is required")
    if (!this._costumerId) throw new Error("customerId is required")
    if (!this._items || !this._items.length) throw new Error("items are required")
  }

  getTotal(): number {
    return this._items.reduce((acc, item) => acc + item._price, 0);
  }
}
