const express = require('express');
const { body,query } = require('express-validator/check');
const router = express.Router();

const isAuth = require('../middleware/is-auth');

const feedController = require('../controllers/feed');

//POST /feed/posts
router.post('/post',
    isAuth,
    [
        body('title').trim()
        .isLowercase().withMessage('Titolo LowerCase')
        .isLength({ min : 3}).withMessage('Titolo Maggiore di 3 Caratteri'),
        body('description').trim()
        .isLength({ min : 5}).withMessage('Description Maggiore di 3 Caratteri'),
    ],
    feedController.createPost);

router.put('/post/:id',isAuth,feedController.editPost);
router.delete('/post/:id',isAuth,feedController.deletePost);

router.get('/post',feedController.getPosts);
router.get('/post/user/me',isAuth,feedController.getPostsByMe);
router.get('/post/search',feedController.searchPost);
router.get('/post/:id',feedController.getPost);

router.post('/post/:id/like',isAuth,feedController.likePost);

module.exports = router;