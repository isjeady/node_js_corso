const express = require('express');
const router = express.Router();
const path = require('path');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const multer = require('multer');

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json()); //application/json

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use(express.static('public'));

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

//Routing
app.use('/',router);
require("./routes")(app);

const User = require('./models/user');
/*
const Post = require('./models/post');
const Like = require('./models/like');
User.hasMany(Post);
Post.belongsTo(User,{ constraints : true, onDelete : 'CASCADE'});
User.belongsToMany(Post,{ through : Like});
Post.belongsToMany(User,{ through : Like});
*/

/*
sequelize.authenticate().then( rec => {
    console.log('Connessione Stabilita con Successo');
    //sequelize.sync({force:true})
    sequelize.sync()
    .then(user => {
        console.log('Sync al DB con Successo');
    }).catch( err => {
        console.log('Sync al DB Error:',err);
    });
}).catch( err => {
     console.log('Connession al DB Error:',err);
});
*/

const dbPath = "mongodb+srv://new-user:NhyNrRMV9L9zxT2y@cluster0-esyf2.mongodb.net/blog?retryWrites=true&w=majority";
//const dbPath = "mongodb://root:mongo@localhost:27017/blog?authSource=admin";
mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true}).then(resp => {
        console.log('\x1b[32m---->%s\x1b[0m', "Mongo DB Connected!!!");
       
        /* const user = new User({
            name : 'Dart',
            email: 'leandro@email.comm',
            password : 'password123456',
            posts : []
        });
        user.save(); */
        app.listen(8080);
    })
    .catch( err => {
        console.log(err);
    });

    



