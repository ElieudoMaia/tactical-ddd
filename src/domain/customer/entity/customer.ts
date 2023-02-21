import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { CustomerValidatorFactory } from "../factory/customer.validator.factory";
import { Address } from "../value-object/address";

export class Customer extends Entity {
  private _name: string = "";
  private _address?: Address;
  private _isActive: boolean = true;
  private _rewardPoints: number = 0;
  private validator = CustomerValidatorFactory.create();

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    this.checkForErrors();
  }

  private validate() {
    this.validator.validate(this);
  }

  private checkForErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  public changeName(name: string) {
    this._name = name;
    this.validator.validate(this);
    this.checkForErrors();
  }

  public activate() {
    if (!this._address) {
      throw new Error("Address is required to activate the customer");
    }
    this._isActive = true;
  }

  public deactivate() {
    this._isActive = false;
  }

  public changeAddress(address: Address) {
    this._address = address;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address | null {
    return this?._address;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set address(address: Address) {
    this._address = address;
  }
}
