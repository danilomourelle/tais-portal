import BasicError from "./Basic";

class PreconditionError extends BasicError {
  constructor(message = "Algumas premissas não foram correspondidas, verifique os dados enviados") {
    super(412, message);
  }
}

export default PreconditionError;
