import BasicError from "@errors/Basic";

class ForbiddenError extends BasicError {
  constructor(message = "Sem autorização para realizar esta ação") {
    super(403, message);
  }
}

export default ForbiddenError;
