import { Request, Response } from "express";
import TemplateBusiness from "./TemplateBusiness";
import TemplateController from "./TemplateController";
import { PrismaTemplateRepository } from "./TemplateRepository";

const TemplateFactory = (request: Request, response: Response) => {
  const templateRepository = new PrismaTemplateRepository();
  const templateBusiness = new TemplateBusiness(templateRepository);
  const templateController = new TemplateController(templateBusiness);

  return templateController.handle(request, response);
};

export default TemplateFactory;
