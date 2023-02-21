import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number = 0;
  private validator = ProductValidatorFactory.create();

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    this.checkForErrors();
  }

  validate(): void {
    this.validator.validate(this);
  }

  private checkForErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  public changeName(name: string): void {
    this._name = name;
    this.validator.validate(this);
    this.checkForErrors();
  }

  public changePrice(price: number): void {
    this._price = price;
    this.validator.validate(this);
    this.checkForErrors();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
