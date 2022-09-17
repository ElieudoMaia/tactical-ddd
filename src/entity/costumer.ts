class Costumer {
  public _isActive: boolean = true;

  constructor(
    public _id: string,
    public _name: string,
    public _address: string
  ) {}

  changeName(name: string) {
    if (name.length > 255) throw new Error("Name is too long");
    this._name = name;
  }

  activate() {
    this._isActive = true;
  }

  deactivate() {
    this._isActive = false;
  }
}
