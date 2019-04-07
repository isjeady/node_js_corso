const { validationResult } = require('express-validator/check');


exports.getPosts = (req,res,next) => {
    res.json({ 
        posts : [
            { 
                id : 1, 
                title : 'titolo 1' , 
                description : 'description adf adf af ',
                image : 'images/1.png',
                author : {
                    name : 'Leandro'
                },
                creation_date : new Date()
            },
            { 
                id : 2, 
                title : 'titolo 1' , 
                description : 'description adf adf af ',
                image : 'images/1.png',
                author : {
                    name : 'Leandro'
                },
                creation_date : new Date()
            },
            { 
                id : 3, 
                title : 'titolo 1' , 
                description : 'description adf adf af ',
                image : 'images/1.png',
                author : {
                    name : 'Leandro'
                },
                creation_date : new Date()
            },

        ]
    });
};


exports.createPosts = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            message : 'Error input Parametri',
            error : errors.array()
        });
    }

    const title = req.body.title;
    const description = req.body.description;

    //SALVO NEL DATABASE e genera ID
    const ID = 1234;
    
    //TODO: test
    res.status(201).json({ 
        messages : 'Success Operation',
        post : { 
            id : ID,
            title : title,
            description : description
        }
    });
};