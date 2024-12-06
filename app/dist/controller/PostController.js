"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    static async getAllPosts(req, res) {
        res.status(200).json([]); // Retorna uma lista vazia por enquanto
    }
}
exports.PostController = PostController;
