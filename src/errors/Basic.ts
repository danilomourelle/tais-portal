class BasicError extends Error {
  constructor(public status = 500, message = "Internal Server Error") {
    super(message);
  }
}

export default BasicError;
