import { Address } from "./address";

export class Customer {
  private _id: string = "";
  private _name: string = "";
  private _address?: Address;
  private _isActive: boolean = true;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  private validate() {
    this.validateID();
    this.validateName();
  }

  private validateID() {
    if (!this._id) throw new Error("Id is required");
  }

  private validateName() {
    if (!this._name) throw new Error("Name is required");
    if (this._name.length > 255) throw new Error("Name is too long");
  }

  public changeName(name: string) {
    this._name = name;
    this.validateName();
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

  public setAddress(address: Address) {
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address | null {
    return this?._address || null;
  }

  get isActive(): boolean {
    return this._isActive;
  }
}
