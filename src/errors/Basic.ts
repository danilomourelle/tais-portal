class BasicError extends Error {
  constructor(public readonly code: number, message: string) {
    super(message);
  }
}

export default BasicError;
