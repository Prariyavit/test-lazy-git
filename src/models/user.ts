import bcrypt from "bcrypt";

class User {
  private _name: string;
  private _hashedPassword: string = "";

  constructor(name: string, password: string) {
    this._name = name;
    this.hashPassword(password)
      .then((hashed) => {
        this._hashedPassword = hashed;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 16;
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._hashedPassword;
  }

  set name(name: string) {
    this._name = name;
  }

  async setPassword(password: string) {
    try {
      const hash = await this.hashPassword(password);
      this._hashedPassword = hash;
    } catch (err) {
      console.error(err);
    }
  }
}
