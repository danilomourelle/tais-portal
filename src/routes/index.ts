import { Router } from "express";
import "@errors/Basic";

const routes = Router();

routes.get("/", (request, response) =>
  response.json({ message: "Hello World" }),
);

export default routes;
