import request from "supertest";
import app from "../index";
import { AppDataSource } from "../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Teste de conexão e endpoint", () => {
  it("Deve retornar status 200 para o endpoint /posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
  });
});