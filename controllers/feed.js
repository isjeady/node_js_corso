const { validationResult } = require('express-validator/check');
const path = require('path');
const fs = require('fs');

const Post = require('../models/post');


exports.createPost = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input Parametri',
            error : errors.array()
        });
    }

    if(!req.file){
        return res.status(422).json({
            message : req.fileValidationError ? req.fileValidationError : 'Nessun immagine allegata...'
        });
    }

    const image = req.file.path.replace(/\\/g,"/");
    const title = req.body.title;
    const description = req.body.description;

    //INSERT NEL DATABASE
    const post = new Post({
        title : title,
        description : description,
        image : image,
        userId : req.user._id
    });

    post.save().then((post) => {
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
    const errors = validationResult(req);
    const postId = req.params.id;

       if(!errors.isEmpty()){
           return res.status(422).json({
               message : 'Error input Parametri',
               error : errors.array()
           });
       }

       const title = req.body.title;
       const description = req.body.description;

       Post.findById(postId).then((post) => {
           if(!post){
               res.status(404).json({ 
                   messages : 'Post Not Found or Not Your Post',
               });
           }
           post.title = title;
           post.description = description;
           if(req.file){
               deleteImage(post.image);
               const image = req.file.path.replace(/\\/g,"/");
               post.image = image;
           }
           return post.save();
       }).then((post) => {
           res.json({ post : post})
       }).catch(
           err => console.log(err)
       );
};




//GET - ALL
exports.getPosts = (req,res,next) => {

    Post.find()
    .then(posts => {
        res.json({ posts : posts});
    }).catch(
        err => console.log(err)
    ); 


    /* 
    Post.findAll({include: [{ model : User, attributes : ['id','name','updatedAt']}]})
    .then(posts => { 
        promises = [];
        posts.forEach(p => {
            const postWithLike = Like.count({ where: { postId: p.id } })
                .then(likes => {
                    p.dataValues.likes = likes;
                    return p;
            });
            promises.push(postWithLike);
        });
        return Promise.all(promises);
    }).then(posts => {
        res.json({ posts : posts});
    }).catch(
        err => console.log(err)
    ); 
    */
};


exports.getPostsByMe = (req,res,next) => {
    Post.find({ userId : req.user._id})
    .then(posts => {
        res.json({ posts : posts});
    }).catch(
        err => console.log(err)
    ); 
};


//GET by ID
exports.getPost = (req,res,next) => {
   const postId = req.params.id;

    Post.findById(postId).then((post) => {
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

   Post.findById(postId).then((post) => {
        if(!post){
            res.status(404).json({ 
                messages : 'Post Not Found',
            });
        }
        post.like++;
        post.save();
        res.json({ post : post})
    }).catch(
        err => console.log(err)
    );
};


exports.searchPost = (req,res,next) => {
    const title = req.query.title ;

    Post.find({title: {$regex: '.*' + title + '.*' }})
    .then(posts => {
        res.json({ posts : posts});
    }).catch(
        err => console.log(err)
    ); 

};








exports.deletePost = (req,res,next) => {
    const postId = req.params.id;

    Post.findByIdAndRemove(postId)
    .then(() => {
        res.status(201).json({ 
            messages : 'Success Operation',
        });
    }).catch(
        err => {console.log(err);
        res.status(401).json({ 
            messages : 'Post Not Found',
        });}
    );
    
 };


const deleteImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
 };