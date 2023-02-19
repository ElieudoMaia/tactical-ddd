import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { Address } from "../value-object/address";

export class Customer extends Entity {
  private _name: string = "";
  private _address?: Address;
  private _isActive: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    this.checkForErrors();
  }

  private checkForErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  private validate() {
    this.validateID();
    this.validateName();
  }

  private validateID() {
    if (!this._id || !this._id.length) {
      this.notification.addError({
        message: "Id is required",
        context: "Customer",
      });
    }
  }

  private validateName() {
    if (!this._name) {
      this.notification.addError({
        message: "Name is required",
        context: "Customer",
      });
    }
    if (this._name.length > 255) {
      this.notification.addError({
        message: "Name is too long",
        context: "Customer",
      });
    }
  }

  public changeName(name: string) {
    this._name = name;
    const errosOnChangeName = []
    if (!this._name) {
      errosOnChangeName.push({
        message: "Name is required",
        context: "Customer",
      });
    }
    if (this._name.length > 255) {
      errosOnChangeName.push({
        message: "Name is too long",
        context: "Customer",
      });
    }
    if (errosOnChangeName.length) {
      throw new NotificationError(errosOnChangeName);
    }
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
