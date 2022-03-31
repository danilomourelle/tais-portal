import { Request, Response } from "express";
import CreateUserBusiness from "./CreateUserBusiness";

class CreateUserController {
  constructor(private createUserBusiness: CreateUserBusiness) {}
  async handle(request: Request, response: Response) {
    const { email, name } = request.body;

    const user = await this.createUserBusiness.execute({ email, name });

    return response.status(200).send({ user });
  }
}

export default CreateUserController;
