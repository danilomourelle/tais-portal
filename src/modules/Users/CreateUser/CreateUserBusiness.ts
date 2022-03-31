import PreconditionError from "@errors/Precondition";
import User from "@models/User";
import { ICreateUserRepository } from "./CreateUserRepository";

class CreateUserBusiness {
  constructor(private createUserRepository: ICreateUserRepository) {}

  async execute({ email, name }: User) {
    const userAlreadyExists = await this.createUserRepository.checkAlreadyExists(email);

    if (userAlreadyExists) {
      throw new PreconditionError("User already exists");
    }

    const newUser = new User({ email, name });
    const userCreated = await this.createUserRepository.create(newUser);

    return userCreated;
  }
}

export default CreateUserBusiness;
