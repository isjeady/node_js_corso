const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const feedController = require('../controllers/feed');

//POST /feed/posts
router.post('/post',
    [
        body('title').trim().isLength({ min : 3}).exists(),
        body('description').trim().isLength({ min : 5}),
    ]
,feedController.createPosts);

//NO AUTH | AUTH
//GET ALL /feed/posts
//GET /feed/post/:id

//POST /feed/post
//PUT /feed/post/:id
//DELETE /feed/post/:id

//POST /feed/post/:id/like

//6 END POINT
//-----> JWT
//POST /user/login
//POST /user/register
//GET  /user/me
//PUT  /user/:id   //verificare permessi

//4 END POINT


router.get('/posts',feedController.getPosts);



module.exports = router;
