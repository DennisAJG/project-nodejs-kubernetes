import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import { AppRoutes } from "./routes";

const app = express();
app.use(express.json());

// Configura as rotas
AppRoutes.forEach((route) => {
  app[route.method as keyof express.Application](
    route.path,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        await route.action(req, res);
      } catch (err) {
        console.error("Erro ao processar a rota:", route.path, err);
        next(err);
      }
    }
  );
});

// Inicializa o banco apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
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

export default app;