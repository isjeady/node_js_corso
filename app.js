const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');


const sequelize = require('./utils/database');

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

/*
app.use((req,res,next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log('Error find User');
    });
});
*/
//Routing
app.use('/',router);
require("./routes")(app);

const Post = require('./models/post');
const User = require('./models/user');
const Like = require('./models/like');

User.hasMany(Post);
Post.belongsTo(User,{ constraints : true, onDelete : 'CASCADE'});

User.belongsToMany(Post,{ through : Like});
Post.belongsToMany(User,{ through : Like});


sequelize.authenticate().then( rec => {
    console.log('Connessione Stabilita con Successo');
    //sequelize.sync({force:true})
    sequelize.sync()
    .then((result) => {return User.findByPk(1);})
    .then(user => {
        if(!user){
            return User.create({ name : 'Leandro', email : 'leandro@email.com', password : '123456'})
        }
        return user;
    })
    .then(user => {
        console.log('Sync al DB con Successo');
    }).catch( err => {
        console.log('Sync al DB Error:',err);
    });
}).catch( err => {
     console.log('Connession al DB Error:',err);
});

app.listen(8080);



