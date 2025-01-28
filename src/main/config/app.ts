import express from "express";
import setupMiddlewares from "./middlewares";
const app = express();

setupMiddlewares(app);
// Middleware para definir o tipo de conteúdo padrão como JSON
app.use((req, res, next) => {
  res.type("json");
  next();
});

app.use(express.json());

export default app;
