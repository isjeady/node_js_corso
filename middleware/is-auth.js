import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { errorsMessages } from "../utils/messages.js";
import { statusCode } from "../utils/statusCode.js";

export const isAuth = (req,res,next) => {

    console.log('AUTHORIZATION MIDDLEWARE');
    console.log(req.get('Authorization'));

    const auth = req.get('Authorization');
    
    if(!auth){
        return res.status(statusCode.Unauthorized).json({
            message : errorsMessages.login.unauthorized
        });
    }

    const token = auth.split(' ')[1];

    let decode;
    try{
        decode = jwt.verify(token,process.env.NODE_JWT_SECRET);
    }catch (err){
        return res.status(500).json({
            message : errorsMessages.login.unauthorized
        });
    }
    
    if(!decode){
        
        return res.status(statusCode.Unauthorized).json({
            message : errorsMessages.login.unauthorized
        });
    }

    let userId = decode.id;

    UserModel.findByPk(userId).then(user => {
        if(user){
            req.user = user;
            next();
        }else{
            throw new Error();
        }
    })
    .catch(err => {
        return res.status(statusCode.Unauthorized).json({
            message : errorsMessages.login.unauthorized
        });
    });
};