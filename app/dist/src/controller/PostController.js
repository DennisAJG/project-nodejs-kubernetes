export class PostController {
    static async getAllPosts(req, res) {
        res.status(200).json([]); // Retorna uma lista vazia por enquanto
    }
}
