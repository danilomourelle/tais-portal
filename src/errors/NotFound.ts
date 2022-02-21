import BasicError from "@errors/Basic";

class NotFound extends BasicError {
  constructor(message: string) {
    super(404, message);
  }
}

export default NotFound;
