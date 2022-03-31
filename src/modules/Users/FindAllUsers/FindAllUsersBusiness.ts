import { IFindAllUsersRepository } from "./FindAllUsersRepository";

class FindAllUsersBusiness {
  constructor(private usersRepository: IFindAllUsersRepository) {}

  async execute() {
    const allUsers = await this.usersRepository.findAll();

    return allUsers;
  }
}

export default FindAllUsersBusiness;
