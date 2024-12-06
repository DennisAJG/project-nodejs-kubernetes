import { getManager } from "typeorm";
import { Post } from "../entity/Post";
/**
 * Saves given post.
 */
export async function postSaveAction(request, response) {
    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Post);
    // create a real post object from post json object sent over http
    const newPost = postRepository.create(request.body);
    // save received post
    await postRepository.save(newPost);
    // return saved post back
    response.send(newPost);
}
