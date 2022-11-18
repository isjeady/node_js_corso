import { validationResult } from "express-validator";
import { deleteImage } from "../../utils/file.helper.js";
import { errorsMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const editPost = (req,res,next) => {
    const postId = req.params.id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(statusCode.UnprocessableEntity).json({
            message : errorsMessages.errorInputParameters,
            error : errors.array()
        });
    }

    const title = req.body.title;
    const description = req.body.description;

    req.user.getPosts({ where : { id : postId }}).then(posts => {
        const post = posts[0];
        if(!post){
            res.status(statusCode.NotFound).json({ 
                messages : errorsMessages.posts.postNotFound,
            });
        }
        post.title = title;
        post.description = description;
        if(req.file){
            deleteImage(post.image);
            const image = req.file.path.replace(/\\/g,"/");
            post.image = image;
        }
        return post.save();
    }).then((post) => {
        res.json({ post : post})
    }).catch(
        err => console.log(err)
    );
};

export { editPost };
