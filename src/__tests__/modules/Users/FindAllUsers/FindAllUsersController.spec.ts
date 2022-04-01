import FindAllUsersBusiness from "@modules/Users/FindAllUsers/FindAllUsersBusiness";
import { IFindAllUsersRepository } from "@modules/Users/FindAllUsers/FindAllUsersRepository";
import InMemoryFindAllUsersRepository from "./FindAllUsersRepository";

describe("Find All Users Business", () => {
  let findAllUsersRepository: IFindAllUsersRepository;
  let findAllUsersBusiness: FindAllUsersBusiness;

  beforeAll(() => {
    findAllUsersRepository = new InMemoryFindAllUsersRepository();
    findAllUsersBusiness = new FindAllUsersBusiness(findAllUsersRepository);
  });

  it("should be able to find all users", async () => {
    const users = await findAllUsersBusiness.execute();

    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("John Doe");
  });
});
