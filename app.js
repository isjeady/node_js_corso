import express from "express";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/index.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import { sequelize } from "./utils/database/sequelize.js";
import { sequelizeAuthenticate } from "./utils/database/connection.js";

//------------------- DIRNAME E FILENAME
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
//--------------------------------
const logStream = fs.createWriteStream(path.join(__dirname,'access.log'), { flags : 'a'});

const router = express.Router();
const app = express();

//-----MIDDLEWARE
app.use(express.static('public'));
app.use('/',router);
app.use(helmet());
app.use(morgan('combined',{ stream : logStream}));
app.use(bodyParser.json()); //application/json
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

//Routing
routes(app);
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

//DATABASE
sequelizeAuthenticate();

app.listen(process.env.NODE_PORT || 5000);

console.log(`Server online ENV:${process.env.NODE_ENV || 'develop'} on http://${process.env.NODE_DATABASE_URL}:${process.env.NODE_PORT}...`);



