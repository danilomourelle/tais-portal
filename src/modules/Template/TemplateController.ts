import { Request, Response } from "express";
import TemplateBusiness from "./TemplateBusiness";

class TemplateController {
  constructor(private templateBusiness: TemplateBusiness) {}
  async handle(request: Request, response: Response) {
    const result = await this.templateBusiness.execute();

    return response.status(200).send({ result });
  }
}

export default TemplateController;
