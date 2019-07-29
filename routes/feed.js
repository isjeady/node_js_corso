const express = require('express');
const { body,query } = require('express-validator/check');
const router = express.Router();

const isAuth = require('../middleware/is-auth');

const feedController = require('../controllers/feed');

//Upload
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

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
        req.fileValidationError = "Estensione non consentita solo: image/png | image/jpg |  image/jpeg";
        callback(null,false);
    }
});

var upload = multer({ storage : storage , fileFilter : fileFilter});

//POST /feed/posts
var cpUpload = upload.single('image');
router.post('/post',
    [isAuth,cpUpload],
    [
        body('title').trim()
        .isLowercase().withMessage('Titolo LowerCase')
        .isLength({ min : 3}).withMessage('Titolo Maggiore di 3 Caratteri'),
        body('description').trim()
        .isLength({ min : 5}).withMessage('Description Maggiore di 3 Caratteri'),
    ],
    feedController.createPost);

router.put('/post/:id',
    [isAuth,cpUpload],
    [
        body('title').trim()
        .isLowercase().withMessage('Titolo LowerCase')
        .isLength({ min : 3}).withMessage('Titolo Maggiore di 3 Caratteri'),
        body('description').trim()
        .isLength({ min : 5}).withMessage('Description Maggiore di 3 Caratteri'),
    ],feedController.editPost);
router.delete('/post/:id',isAuth,feedController.deletePost);

router.get('/post',feedController.getPosts);
router.get('/post/user/me',isAuth,feedController.getPostsByMe);
router.get('/post/search',feedController.searchPost);
router.get('/post/:id',feedController.getPost);

router.post('/post/:id/like',isAuth,feedController.likePost);

module.exports = router;