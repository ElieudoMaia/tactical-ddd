class Costumer {
  private _id: string = "";
  private _name: string = "";
  private _address: string = "";
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
    if (!this._id) throw new Error("ID is required");
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
      throw new Error("Address is required to activate the costumer");
    }
    this._isActive = true;
  }

  public deactivate() {
    this._isActive = false;
  }
}
