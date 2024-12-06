"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGetAllAction = void 0;
const data_source_1 = require("../data-source");
const Post_1 = require("../entity/Post");
const postGetAllAction = async (req, res) => {
    try {
        const postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
        const posts = await postRepository.find();
        console.log("Posts encontrados:", posts);
        res.json(posts);
    }
    catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(500).send("Erro ao buscar posts");
    }
};
exports.postGetAllAction = postGetAllAction;
