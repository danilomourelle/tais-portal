import User from "@models/User";
import portal from "src/database/prisma/portalClient";

export interface ITemplateRepository {
  findAll(): Promise<User[]>;
}

export class PrismaTemplateRepository implements ITemplateRepository {
  async findAll(): Promise<User[]> {
    const result = await portal.user.findMany();

    return result;
  }
}
