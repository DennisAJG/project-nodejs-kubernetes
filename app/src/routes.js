import { Router } from "express";

const routes = Router();

routes.get("/posts", (req, res) => {
  res.status(200).json([]); // Retorna uma lista vazia
});

export default routes;