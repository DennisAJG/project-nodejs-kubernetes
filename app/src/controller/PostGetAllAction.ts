import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const postGetAllAction = async (req: Request, res: Response) => {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find();
    console.log("Posts encontrados:", posts);
    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).send("Erro ao buscar posts");
  }
};