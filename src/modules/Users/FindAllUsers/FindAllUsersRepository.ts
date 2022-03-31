import User from "@models/User";
import portal from "src/database/prisma/portalClient";

export interface IFindAllUsersRepository {
  findAll(): Promise<User[]>;
}

export class PrismaFindAllUsersRepository implements IFindAllUsersRepository {
  async findAll(): Promise<User[]> {
    const allUsers = await portal.user.findMany();

    return allUsers;
  }
}
