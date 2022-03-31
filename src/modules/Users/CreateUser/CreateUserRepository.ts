import User from "@models/User";
import portal from "src/database/prisma/portalClient";

export interface ICreateUserRepository {
  checkAlreadyExists(email: string): Promise<boolean>;
  create(user: User): Promise<User>;
}

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async checkAlreadyExists(email: string): Promise<boolean> {
    const user = await portal.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async create({ email, name }: User): Promise<User> {
    const user = await portal.user.create({
      data: {
        email,
        name,
      },
    });

    return user;
  }
}
