import { errorsMessages, successMessages } from '../../utils/messages.js';
import { statusCode } from '../../utils/statusCode.js';

const createGallery = (req,res,next) => {
   
    if(req.files.length == 0){
        return res.status(statusCode.UnprocessableEntity).json({
            message : req.fileValidationError ? req.fileValidationError : errorsMessages.posts.fileAttach
        });
    }

    res.status(statusCode.Created).json({ 
        messages : successMessages.successOperation,
    });
};

export { createGallery }
