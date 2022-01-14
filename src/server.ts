import express from "express";
import routes from "./routes";

const app = express();

app.use(routes);

/* eslint-disable no-console */
app.listen(3000, () => {
  console.log("🚀 Server running on  dfsf dfdfdfdfd port 3000");
});
