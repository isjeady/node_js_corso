const express = require('express');
const router = express.Router();
const path = require('path');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const multer = require('multer');

const sequelize = require('./utils/database');

const app = express();

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images');
    },
    filename : (req,file,callback) => {
        //callback(null,Date.now() + '-' + file.originalname);
        callback(null, uuidv4() + path.extname(file.originalname));
    },
});

const fileFilter = ((req,file,callback) =>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        callback(null,true);
    }else{
        callback(null,false);
    }
});

app.use(bodyParser.json()); //application/json
app.use(
    multer({ storage : storage , fileFilter : fileFilter}).single('image')
);

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
    .then(user => {
        console.log('Sync al DB con Successo');
    }).catch( err => {
        console.log('Sync al DB Error:',err);
    });
    /*
    .then((result) => {return User.findByPk(1);})
    .then(user => {
        if(!user){
            return User.create({ name : 'Leandro', email : 'leandro@email.com', password : '123456'})
        }
        return user;
    })*/
}).catch( err => {
     console.log('Connession al DB Error:',err);
});

app.listen(8080);



