import express from "express";

const app = express();

// Middleware para definir o tipo de conteúdo padrão como JSON
app.use((req, res, next) => {
  res.type("json");
  next();
});

app.use(express.json());

export default app;
