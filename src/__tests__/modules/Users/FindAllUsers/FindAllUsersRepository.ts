import User from "@models/User";
import { IFindAllUsersRepository } from "@modules/Users/FindAllUsers/FindAllUsersRepository";

class InMemoryFindAllUsersRepository implements IFindAllUsersRepository {
  private users: User[] = [
    {
      name: "John Doe",
      email: "john.doe@email.com",
    },
    {
      name: "Jane Danny",
      email: "jane.danny@email.com",
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

export default InMemoryFindAllUsersRepository;
