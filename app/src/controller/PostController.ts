import { Request, Response } from "express";

export class PostController {
  static async getAllPosts(req: Request, res: Response) {
    res.status(200).json([]); // Retorna uma lista vazia por enquanto
  }
}