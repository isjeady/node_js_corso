import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { createPost, deletePost, editPost, getPost, getPosts, getPostsByMe, likePost, searchPost } from "../controllers/posts/index.js";
import { POSTS, POSTS_LIKE, POSTS_ME, POSTS_SEARCH } from "./routes.js";
import { isAuth } from "../middleware/is-auth.js";
import { body } from "express-validator";
import { errorsMessages } from "../utils/messages.js";
const router = express.Router();

//Upload
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images');
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
var cpUpload = upload.single('image');

router.post(`/:id${POSTS_LIKE}`,isAuth, likePost);
router.get(`${POSTS_SEARCH}`,searchPost);

router.get(`/`, getPosts);
router.get('/:id', getPost);
router.get(POSTS_ME,isAuth, getPostsByMe);

router.post('/',
    [
        isAuth,
        cpUpload
    ],
    [
        body('title').trim()
        .isLowercase().withMessage(errorsMessages.posts.titleLower)
        .isLength({ min : 3}).withMessage(errorsMessages.posts.titleLength),
        body('description').trim()
        .isLength({ min : 5}).withMessage(errorsMessages.posts.descriptionLength),
    ],
    createPost
);

router.put('/:id',
    [
        isAuth,
        cpUpload
    ],
    [
        body('title').trim()
        .isLowercase().withMessage(errorsMessages.posts.titleLower)
        .isLength({ min : 3}).withMessage(errorsMessages.posts.titleLength),
        body('description').trim()
        .isLength({ min : 5}).withMessage(errorsMessages.posts.descriptionLength),
    ],
    editPost
);

router.delete('/:id',isAuth, deletePost);

const feedRoutes = router;
export default feedRoutes;