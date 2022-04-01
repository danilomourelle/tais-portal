import { ITemplateRepository } from "./TemplateRepository";

class TemplateBusiness {
  constructor(private templateRepository: ITemplateRepository) {}

  async execute() {
    const result = await this.templateRepository.findAll();

    return result;
  }
}

export default TemplateBusiness;
