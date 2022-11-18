import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/userModel.js";
import { errorsMessages, successMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const loginUser = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(statusCode.UnprocessableEntity).json({
            message : errorsMessages.errorInputParameters,
            error : errors.array()
        });
    }

    const email = req.body.email;
    const password = req.body.password;

    let loginUser;

    UserModel.findOne( { where : { email : email}}).then(user => {
        if(!user){
            return res.status(401).json({
                message : errorsMessages.login.notAuthorizedEmail
            });
        }
        loginUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            return res.status(401).json({
                message : errorsMessages.login.notAuthorizedPassword
            });
        }
        const token = jwt.sign(
            {
                id : loginUser.id,
                email : loginUser.email,
                name : loginUser.name
            },process.env.NODE_JWT_SECRET,{expiresIn : '1h'});

        res.status(201).json({ 
            messages : successMessages.successOperation,
            id : loginUser.id,
            token : token,
        });
    })
    .catch(err => {
        return res.status(422).json({
            message : err
        });
    });

};

export { loginUser }