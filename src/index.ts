import express, { Express } from "express";
import Knex from "knex";
import { Model } from "objection";
import dotenv from "dotenv";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";
// import YAML from "yamljs";
const swaggerDocument = require("./docs/openapi.json");

dotenv.config();
const knexInstance = Knex({
  client: "pg",
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  },
});
Model.knex(knexInstance);
const app: Express = express();
// const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
