import { validationResult } from "express-validator";
import { errorsMessages, successMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";
import { PostModel } from "../../models/postModel.js";
import { LikeModel } from "../../models/likeModel.js";
import { UserModel } from "../../models/userModel.js";
import { deleteImage } from "../../utils/file.helper.js";
import { Op } from "sequelize";

//GET - ALL
const getPosts = (req,res,next) => {
    PostModel.findAll({include: [{ model : UserModel, attributes : ['id','name','updatedAt']}]})
    .then(posts => { 
        let promises = [];
        posts.forEach(p => {
            const postWithLike = LikeModel.count({ where: { postId: p.id } })
                .then(likes => {
                    p.dataValues.likes = likes;
                    return p;
            });
            promises.push(postWithLike);
        });
        return Promise.all(promises);
    }).then(posts => {
        res.json({ posts : posts});
    }).catch(
        err => console.log(err)
    );
};

const getPostsByMe = (req,res,next) => {
    req.user.getPosts().then((posts) => {
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};

 //GET by ID
const getPost = (req,res,next) => {
    const postId = req.params.id;
     PostModel.findByPk(postId).then((post) => {
        if(!post){
            res.status(statusCode.NotFound).json({ 
                messages : errorsMessages.posts.postNotFound,
            });
        }      
        const postWithLike = LikeModel.count({ where: { postId: post.id } })
            .then(likes => {
                    post.dataValues.likes = likes;
                    return post;
            });
        return postWithLike
    }).then(post => {
        res.json({ post : post});
    }).catch(
         err => console.log(err)
     );
 };

const searchPost = (req,res,next) => {
    const title = '%'+ req.query.title +'%';
    PostModel.findAll({ where : { title : {[Op.like] : title}}}).then((posts) => {
        console.log(posts);
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};


export { 
    getPosts,
    getPost, 
    getPostsByMe,
    searchPost 
}