const { validationResult } = require('express-validator/check');
const db = require('../utils/database');

exports.getPosts = (req,res,next) => {
   db.execute('SELECT * FROM posts')
    .then(([rows,fieldData]) => {
        res.json({ posts : rows})
    }).catch(
        err => console.log(err)
    );
};

exports.getPost = (req,res,next) => {
   const id = req.params.id;
   db.execute(' SELECT * FROM posts WHERE posts.id = ?',[id])
   .then(([rows,fieldData]) => {
        res.json({ posts : rows})
   })
   .catch(
        err => console.log(err)
   ); 
};

exports.searchPost = (req,res,next) => {
   //.........QUI IL CODICE PER l'esercizio
   //QUERY:SELECT * FROM posts WHERE posts.title LIKE '%tit%'
   //req.query.parametro_query
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
    var newPost = db.execute('INSERT INTO posts (title,description) VALUES (?,?)',
    [title,description])

    //console.log(newPost);
    //SALVO NEL DATABASE e genera ID
    newPost.then(newP => {
        const ID = newP[0].insertId;
        res.status(201).json({ 
            messages : 'Success Operation',
            post : { 
                id : ID,
                title : title,
                description : description
            }
        });
    }).catch( err => {
        return res.status(422).json({
            message : 'Error nel Salvataggio'
        });
    })

 
    
    
};