import BasicError from "@errors/Basic";

class BadRequest extends BasicError {
  constructor(message = "Parece que temos um erro") {
    super(400, message);
  }
}

export default BadRequest;
