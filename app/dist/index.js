"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configura as rotas
routes_1.AppRoutes.forEach((route) => {
    app[route.method](route.path, async (req, res, next) => {
        try {
            await route.action(req, res);
        }
        catch (err) {
            console.error("Erro ao processar a rota:", route.path, err);
            next(err);
        }
    });
});
// Inicializa o banco apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== "test") {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("Conexão com o banco de dados estabelecida");
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
        .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });
}
exports.default = app;
