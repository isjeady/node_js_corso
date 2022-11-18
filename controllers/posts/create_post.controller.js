import { validationResult } from "express-validator";
import { errorsMessages, successMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const createPost = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(statusCode.UnprocessableEntity).json({
            message : errorsMessages.errorInputParameters,
            error : errors.array()
        });
    }

    if(!req.file){
        return res.status(statusCode.UnprocessableEntity).json({
            message : req.fileValidationError ? req.fileValidationError : errorsMessages.posts.fileAttach
        });
    }

    const image = req.file.path.replace(/\\/g,"/");
    const title = req.body.title;
    const description = req.body.description;

    //INSERT NEL DATABASE
    req.user.createPost({
        title : title,
        description : description,
        image : image
    }).then((post) => {
        res.status(statusCode.Created).json({ 
            messages : successMessages.successOperation,
            post : post
        });
    }).catch( err => {
        return res.status(statusCode.UnprocessableEntity).json({
            message : errorsMessages.errorSave
        });
    });
};

export { createPost };
