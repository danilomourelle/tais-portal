import { Request, Response } from "express";
import FindAllUsersBusiness from "./FindAllUsersBusiness";

class FindAllUsersController {
  constructor(private findUserBusiness: FindAllUsersBusiness) {}
  async handle(request: Request, response: Response) {
    const allUsers = await this.findUserBusiness.execute();

    return response.status(200).send({ allUsers });
  }
}

export default FindAllUsersController;
