"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const data_source_1 = require("../data-source");
beforeAll(async () => {
    await data_source_1.AppDataSource.initialize();
});
afterAll(async () => {
    await data_source_1.AppDataSource.destroy();
});
describe("Teste de conexão e endpoint", () => {
    it("Deve retornar status 200 para o endpoint /posts", async () => {
        const response = await (0, supertest_1.default)(index_1.default).get("/posts");
        expect(response.status).toBe(200);
    });
});
