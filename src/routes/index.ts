import { Router } from "express";
import users from "./userRoutes";
// import redisDB3 from "src/database/redis/configDataBase3";

const routes = Router();

routes.use("/users", users);

/**
 * REDIS Example
 */
/* routes.post("/", async (request, response) => {
  redisDB3.set("teste-portal", "3");
  response.send({ message: "ok" });
}); */

export default routes;
