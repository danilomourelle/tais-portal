import PreconditionError from "@errors/Precondition";
import User from "@models/User";
import CreateUserBusiness from "@modules/Users/CreateUser/CreateUserBusiness";
import { ICreateUserRepository } from "@modules/Users/CreateUser/CreateUserRepository";
import InMemoryCreateUserRepository from "./CreateUserRepository";

describe("Create User Business", () => {
  let createUserRepository: ICreateUserRepository;
  let createUserBusiness: CreateUserBusiness;

  beforeAll(() => {
    createUserRepository = new InMemoryCreateUserRepository();
    createUserBusiness = new CreateUserBusiness(createUserRepository);
  });

  it("should be able to create a new user", async () => {
    const userData: User = {
      name: "Test Name",
      email: "test@test.com.br",
    };

    const user = await createUserBusiness.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("test@test.com.br");
  });

  it("should not be able to create an existing user", async () => {
    const userData: User = {
      name: "Test Existing Name",
      email: "testexisting@test.com.br",
    };

    await createUserBusiness.execute(userData);

    await expect(createUserBusiness.execute(userData)).rejects.toEqual(
      new PreconditionError("User already exists"),
    );
  });
});
