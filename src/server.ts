import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import BasicError from "@errors/Basic";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
app.use((error: BasicError | Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof BasicError) {
    response.status(error.code).send({
      error: true,
      message: error.message,
    });
  } else {
    console.error(error.stack);
    response.status(500).send({
      error: true,
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  /* eslint-disable-next-line no-console */
  console.log("🚀 Server running on port 3000");
});
