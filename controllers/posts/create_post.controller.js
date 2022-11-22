import { validationResult } from "express-validator";
import slugify from "slugify";
import { errorsMessages, successMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";
import { v4 as uuidv4 } from 'uuid';

const createPost = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(statusCode.UnprocessableEntity).json({
            message : errorsMessages.errorInputParameters,
            error : errors.array()
        });
    }

    let image = "";

    if(req.file){
        /* return res.status(statusCode.UnprocessableEntity).json({
            message : req.fileValidationError ? req.fileValidationError : errorsMessages.posts.fileAttach
        }); */
        image = req.file.path.replace(/\\/g,"/");
    }

    const title = req.body.title;
    const slug = slugify(req.body.slug);
    const teaser = req.body.teaser;
    const description = req.body.description;
    const published = req.body.published;
    const uuid = uuidv4();

    //INSERT NEL DATABASE
    req.user.createPost({
        title : title,
        slug : slug,
        teaser : teaser,
        published : published,
        uuid : uuid,
        description : description,
        image : image
    }).then((post) => {
        res.status(statusCode.Created).json({ 
            messages : successMessages.successOperation,
            post : post
        });
    }).catch( err => {
        return res.status(statusCode.UnprocessableEntity).json({
            message : `${errorsMessages.errorSave}.${(err && err.parent && err.parent.sqlMessage) ? err.parent.sqlMessage : ""}`
        });
    });
};

export { createPost };
