import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { AppRoutes } from "./routes";
const app = express();
app.use(express.json());
AppRoutes.forEach((route) => {
    app[route.method](route.path, async (req, res, next) => {
        try {
            await route.action(req, res);
        }
        catch (err) {
            next(err);
        }
    });
});
AppDataSource.initialize()
    .then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
})
    .catch((error) => console.log("Erro ao conectar ao banco de dados", error));
export default app;
