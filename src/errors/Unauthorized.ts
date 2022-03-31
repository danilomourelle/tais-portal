import BasicError from "@errors/Basic";

export class UnauthorizedError extends BasicError {
  constructor(message = "Acesso negado. Verifique suas credenciais") {
    super(401, message);
  }
}

export default UnauthorizedError;
