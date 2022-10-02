export class Address {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  validate() {
    if (!this._street.length) {
      throw new Error("Street is required");
    }
    if (this._number <= 0) {
      throw new Error("Invalid number");
    }
    if (!this._zip.length) {
      throw new Error("ZIP code is required");
    }
    if (!this._city.length) {
      throw new Error("City is required");
    }
  }

  toString() {
    return `${this._city} ${this._street} ${this._number}`
  }
}
