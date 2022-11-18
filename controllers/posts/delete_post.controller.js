import { PostModel } from "../../models/postModel.js";
import { errorsMessages, successMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const deletePost = (req,res,next) => {
    const postId = req.params.id;

    PostModel.findByPk(postId).then(post => {
        if(!post){
            res.status(statusCode.NotFound).json({ 
                messages : errorsMessages.posts.postNotFound,
            });
        }
        if(post.userId != req.user.id){
            res.status(statusCode.NotFound).json({ 
                messages : errorsMessages.errorOperationNot,
            });
        }else{
            return post.destroy();
        }
    }).then(() => {
        res.status(statusCode.Created).json({ 
            messages : successMessages.successOperation,
        });
    }).catch(
        err => console.log(err)
    );
}; 

export { deletePost };
