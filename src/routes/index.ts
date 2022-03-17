import { Router } from "express";
import "@errors/Basic";
import redisDB3 from "src/database/redis/configDataBase3";

const routes = Router();

routes.get("/", async (request, response) => {
  const result = await redisDB3.get("teste-portal");
  response.send({ result });
});

routes.post("/", async (request, response) => {
  redisDB3.set("teste-portal", "3");
  response.send({ message: "ok" });
});

export default routes;
