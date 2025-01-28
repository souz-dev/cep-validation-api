import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

describe("Body Parser Middleware", () => {
  test("Should parse body as json", async () => {
    app.post("/test_body_parser", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post("/test_body_parser")
      .send({ name: "John", email: "john@example.com", cep: "12345678" })
      .expect(200, {
        name: "John",
        email: "john@example.com",
        cep: "12345678",
      });
  });
});
