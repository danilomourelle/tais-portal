import { ITemplateRepository } from "./TemplateRepository";

class TemplateBusiness {
  constructor(private templateRepository: ITemplateRepository) {}

  async execute() {
    return this.templateRepository.findAll();
  }
}

export default TemplateBusiness;
