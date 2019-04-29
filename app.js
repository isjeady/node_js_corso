const express = require('express');
const router = express.Router();
const path = require('path');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
var morgan = require('morgan');

var helmet = require('helmet');

const sequelize = require('./utils/database');

const app = express();

app.use(helmet());

const logStream = fs.createWriteStream(path.join(__dirname,'access.log'), { flags : 'a'});
app.use(morgan('combined',{ stream : logStream}));

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

const Post = require('./models/post');
const User = require('./models/user');
const Like = require('./models/like');

User.hasMany(Post);
Post.belongsTo(User,{ constraints : true, onDelete : 'CASCADE'});

User.belongsToMany(Post,{ through : Like});
Post.belongsToMany(User,{ through : Like});

console.log(process.env.NODE_ENV || 'develop');


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

app.listen(process.env.PORT || 5000);



