import { Request, Response } from "express";
import CreateUserBusiness from "./CreateUserBusiness";
import CreateUserController from "./CreateUserController";
import { PrismaCreateUserRepository } from "./CreateUserRepository";

const createUserFactory = (request: Request, response: Response) => {
  const createUserRepository = new PrismaCreateUserRepository();
  const createUserBusiness = new CreateUserBusiness(createUserRepository);
  const createUserController = new CreateUserController(createUserBusiness);

  return createUserController.handle(request, response);
};

export default createUserFactory;
