import { PostModel } from "../../models/postModel.js";
import { errorsMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const likePost = (req,res,next) => {
    const postId = req.params.id;
 
    PostModel.findByPk(postId).then((post) => {
        if(!post){
            res.status(statusCode.NotFound).json({ 
                messages : errorsMessages.posts.postNotFound,
            });
        }
        post.getUsers({ where : { id : req.user.id }}).then(records => {
            const record = records[0]; 
            if(!record){
                post.addUser(req.user);
                res.json({ post :'Like'})
            }else{
                post.removeUser(req.user);
                res.json({ post : 'No Like'})
            }
        });
    }).catch(
        err => console.log(err)
    );
 };



export { likePost };
