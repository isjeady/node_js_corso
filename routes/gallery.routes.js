import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { createGallery } from "../controllers/gallery/index.js";

import { isAuth } from "../middleware/is-auth.js";
import { errorsMessages } from "../utils/messages.js";
const router = express.Router();

//Upload
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/gallery');
    },
    filename : (req,file,callback) => {
        //callback(null,Date.now() + '-' + file.originalname);
        callback(null,uuidv4() + path.extname(file.originalname));
    },
});

const fileFilter = ((req,file,callback) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        callback(null,true);
    }else{
        req.fileValidationError = errorsMessages.posts.fileError;
        callback(null,false);
    }
});

var upload = multer({ storage : storage , fileFilter : fileFilter});
var cpUpload = upload.array('images',3);

router.post('/',
    [
        isAuth,
        cpUpload
    ],
    createGallery
);

const galleryRoutes = router;
export default galleryRoutes;