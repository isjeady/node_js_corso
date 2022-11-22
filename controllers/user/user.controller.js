import { Op } from "sequelize";
import { LikeModel } from "../../models/likeModel.js";
import { PostModel } from "../../models/postModel.js";
import { errorsMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const getPostsByMe = (req,res,next) => {
    req.user.getPosts().then((posts) => {
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};

 //GET by ID
const getPostByMe = (req,res,next) => {
    const postId = req.params.id;
    req.user.getPosts({
        where: {
            id: {
              [Op.eq]: postId
            }
        }
    }).then((posts) => {
        if(posts.length > 0){
            let post = posts[0];
            const postWithLike = LikeModel.count({ where: { postId: post.id } })
                .then(likes => {
                        post.dataValues.likes = likes;
                        return post;
                });
            return postWithLike 
        }else{
            res.status(statusCode.NotFound).json({ 
                messages : errorsMessages.posts.postNotFound,
            });
        }
    }).then(post => {
        res.json({ post : post});
    }).catch(
         err => console.log(err)
     );
 };



export {
    getPostsByMe,
    getPostByMe
};
