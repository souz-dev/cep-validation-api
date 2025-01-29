import request from "supertest";
import express from "express";

const app = express();

// Middleware para definir o tipo de conteúdo padrão como JSON
app.use((req, res, next) => {
  res.type("json");
  next();
});

app.use(express.json());

describe("Content Type Middleware", () => {
  test("Should return default content type as json", async () => {
    app.get("/test_content_type", (req, res) => {
      res.send("");
    });

    await request(app).get("/test_content_type").expect("content-type", /json/);
  });

  test("Should return content type as xml if forced", async () => {
    app.get("/test_content_type_xml", (req, res) => {
      res.type("xml");
      res.send("");
    });

    await request(app)
      .get("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
