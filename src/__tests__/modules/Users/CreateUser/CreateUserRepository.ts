import User from "@models/User";
import { ICreateUserRepository } from "@modules/Users/CreateUser/CreateUserRepository";

class InMemoryCreateUserRepository implements ICreateUserRepository {
  private users: User[] = [];

  async checkAlreadyExists(email: string): Promise<boolean> {
    const hasUser = this.users.some((user) => user.email === email);

    return hasUser;
  }

  async create(user: User): Promise<User> {
    const newUser = {
      ...user,
      id: this.users.length + 1,
    };

    this.users.push(newUser);

    return newUser;
  }
}

export default InMemoryCreateUserRepository;
