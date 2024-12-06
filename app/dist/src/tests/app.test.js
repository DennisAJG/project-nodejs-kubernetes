import request from "supertest";
import app from "../src/index";
describe("GET /posts", () => {
    it("deve retornar uma lista vazia de posts", async () => {
        const response = await request(app).get("/posts");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});
