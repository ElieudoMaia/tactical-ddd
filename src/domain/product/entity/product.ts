import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number = 0;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    this.checkForErrors();
  }

  validate(): void {
    if (!this._id) {
      this.notification.addError({
        message: "Id is required",
        context: "Product",
      });
    }
    this.validateName();
    this.validatePrice();
  }

  private checkForErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  private validateName(): void {
    if (!this._name) {
      this.notification.addError({
        message: "Name is required",
        context: "Product",
      });
    }
  }

  private validatePrice(): void {
    if (!this._price || this._price < 0) {
      this.notification.addError({
        message: "Price must be greater than zero",
        context: "Product",
      });
    }
  }

  public changeName(name: string): void {
    this._name = name;
    if (!this._name) {
      throw new NotificationError([
        {
          message: "Name is required",
          context: "Product",
        },
      ]);
    }
  }

  public changePrice(price: number): void {
    this._price = price;
    if (!this._price || this._price < 0) {
      throw new NotificationError([
        {
          message: "Price must be greater than zero",
          context: "Product",
        },
      ]);
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
