const express = require('express');
const { body,query } = require('express-validator/check');
const router = express.Router();

const feedController = require('../controllers/feed');

//POST /feed/posts
router.post('/post',
    [
        body('title').trim()
        .isLowercase().withMessage('Titolo LowerCase')
        .isLength({ min : 3}).withMessage('Titolo Maggiore di 3 Caratteri'),
        body('description').trim()
        .isLength({ min : 5}).withMessage('Description Maggiore di 3 Caratteri'),
    ]
    ,feedController.createPost);
    
router.get('/post',feedController.getPosts);
router.post('/post/:id/like',feedController.likePost);
router.get('/post/user/me',feedController.getPostsByMe);
router.get('/post/search',feedController.searchPost);
router.get('/post/:id',feedController.getPost);
router.put('/post/:id',feedController.editPost);
router.delete('/post/:id',feedController.deletePost);


//NO AUTH | AUTH
//*GET ALL /feed/posts
//*GET /feed/post/:id

//*POST /feed/post
//*PUT /feed/post/:id
//*DELETE /feed/post/:id

//POST /feed/post/:id/like

//6 END POINT
//-----> JWT
//POST /user/login
//POST /user/register
//GET  /user/me
//PUT  /user/:id   //verificare permessi

//4 END POINT





module.exports = router;
