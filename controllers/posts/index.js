import { 
    getPosts,
    getPost, 
    searchPost 
} from "./posts.controller.js";

import { createPost } from "./create_post.controller.js";
import { editPost } from "./edit_post.controller.js";
import { deletePost } from "./delete_post.controller.js";
import { likePost } from "./like_post.controller.js";


export { 
    getPosts,
    getPost, 
    searchPost, 
    createPost,
    editPost, 
    deletePost,
    likePost,
}