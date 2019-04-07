exports.getPosts = (req,res,next) => {
    res.json({ 
        posts : [
            {
                id : 3 ,
                title : 'first' , 
                description : 'description' 
            },
            {
                id : 5 ,
                title : 'first' , 
                description : 'description' 
            },
            {
                id : 1323 ,
                title : 'first' , 
                description : 'description' 
            }
        ]
    });
};


exports.createPosts = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;

    //Salvo nel DB e torno il nuovo ID
    const ID = 1324; //back to DB

    res.status(201).json({ 
        messages : 'Success Operation',
        post : [
            {
                id : ID ,
                title : title , 
                description : description
            }
        ]
    });
};