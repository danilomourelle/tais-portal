import { Request, Response } from "express";
import FindAllUsersBusiness from "./FindAllUsersBusiness";
import FindAllUsersController from "./FindAllUsersController";
import { PrismaFindAllUsersRepository } from "./FindAllUsersRepository";

const findAllUsersFactory = (request: Request, response: Response) => {
  const findAllUserRepository = new PrismaFindAllUsersRepository();
  const findAllUsersBusiness = new FindAllUsersBusiness(findAllUserRepository);
  const findAllUsersController = new FindAllUsersController(findAllUsersBusiness);

  return findAllUsersController.handle(request, response);
};

export default findAllUsersFactory;
