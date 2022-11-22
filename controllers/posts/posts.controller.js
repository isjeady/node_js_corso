import { Op } from "sequelize";
import { LikeModel } from "../../models/likeModel.js";
import { PostModel } from "../../models/postModel.js";
import { UserModel } from "../../models/userModel.js";
import { errorsMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

//GET - ALL
const getPosts = (req,res,next) => {
    PostModel.findAll({
        include: [
            { 
                model : UserModel, 
                attributes : ['id','name','updatedAt']
            }
        ],
        where: {
            published: {
              [Op.not]: false
            }
        }
    })
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

 //GET by ID
const getPost = (req,res,next) => {
    const postId = req.params.id;
     PostModel.findByPk(postId).then((post) => {
        if(!post || !post.published){
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
    PostModel.findAll(
        { 
            where : { 
                title : {
                    [Op.like] : title
                },
                published: {
                    [Op.not]: false
                }
            }
    }).then((posts) => {
        console.log(posts);
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};


export {
    getPosts,
    getPost,
    searchPost
};
