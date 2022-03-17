import Redis from "ioredis";

const redisDB3 = new Redis({
  port: 30_000,
  host: "tim-tais-dev.us-south.containers.appdomain.cloud",
  password: "20708fd5bfbdf2e6a18a4bd0292b6a5a7451ba11fb91baaba210",
  db: 3,
});

export default redisDB3;
