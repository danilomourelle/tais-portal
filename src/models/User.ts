class User {
  id?: number;
  name: string;
  email: string;

  constructor({ name, email }: User) {
    this.email = email;
    this.name = name;
  }

  static create({ name, email }: User) {
    return new User({ name, email });
  }
}

export default User;
