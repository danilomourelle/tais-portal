import BasicError from "@errors/Basic";

class NotFoundError extends BasicError {
  constructor(message = "Dado não encontrado") {
    super(404, message);
  }
}

export default NotFoundError;
