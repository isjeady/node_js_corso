const { validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Post = require('../models/post');

//GET - ALL
exports.getPosts = (req,res,next) => {
    Post.findAll().then((posts) => {
        console.log(posts);
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};

exports.getPostsByMe = (req,res,next) => {
    //Post.findAll().then((posts) => {
    req.user.getPosts().then((posts) => {
        console.log(posts);
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};
//GET by ID
exports.getPost = (req,res,next) => {
   const postId = req.params.id;

    Post.findByPk(postId).then((post) => {
        if(!post){
            res.status(404).json({ 
                messages : 'Post Not Found',
            });
        }
        res.json({ post : post})
    }).catch(
        err => console.log(err)
    );
};

exports.likePost = (req,res,next) => {
   const postId = req.params.id;

    Post.findByPk(postId).then((post) => {
        if(!post){
            res.status(404).json({ 
                messages : 'Post Not Found',
            });
        }
        post.getUsers({ where : { id : req.user.id }}).then(records => {
            const record = records[0]; 
            if(!record){
                post.addUser(req.user);
                res.json({ post :'Like'})
            }else{
                post.removeUser(req.user);
                res.json({ post : 'No Like'})
            }
        });
    }).catch(
        err => console.log(err)
    );
};

exports.searchPost = (req,res,next) => {
    const title = '%'+ req.query.title +'%';
    Post.findAll({ where : { title : {[Op.like] : title}}}).then((posts) => {
        console.log(posts);
        res.json({ posts : posts})
    }).catch(
        err => console.log(err)
    );
};


exports.createPost = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input Parametri',
            error : errors.array()
        });
    }

    const title = req.body.title;
    const description = req.body.description;
    //INSERT NEL DATABASE
    req.user.createPost({
        title : title,
        description : description,
    }).then((post) => {
        res.status(201).json({ 
            messages : 'Success Operation',
            post : post
        });
    }).catch( err => {
        return res.status(422).json({
            message : 'Error nel Salvataggio'
        });
    }); 
};


exports.editPost = (req,res,next) => {
     const postId = req.params.id;
     const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({
                message : 'Error input Parametri',
                error : errors.array()
            });
        }

        const title = req.body.title;
        const description = req.body.description;

        req.user.getPosts({ where : { id : postId }}).then(posts => {
            const post = posts[0];
            if(!post){
                res.status(404).json({ 
                    messages : 'Post Not Found or Not Your Post',
                });
            }
            post.title = title;
            post.description = description;
            return post.save();
        }).then((post) => {
            res.json({ post : post})
        }).catch(
            err => console.log(err)
        );
 };



 exports.deletePost = (req,res,next) => {
    const postId = req.params.id;

    Post.findByPk(postId).then(post => {
        if(!post){
            var e = new Error("Post Not Found");
            e.statusCode = 404;
            throw e;
        }
        if(post.userId != req.user.id){
            var e = new Error("Operazione non Permessa");
            e.statusCode = 402;
            throw e;
        }
        return post.destroy();
    }).then(() => {
        res.status(201).json({ 
            messages : 'Success Operation',
        });
    }).catch((err) =>{
        console.log(err.message);
        res.status(err.statusCode).json({ 
            messages : err.message,
        });
    });
    
 };