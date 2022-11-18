import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { UserModel } from "../../models/userModel.js";
import { errorsMessages, successMessages } from "../../utils/messages.js";
import { statusCode } from "../../utils/statusCode.js";

const registerUser = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(statusCode.UnprocessableEntity).json({
            message : errorsMessages.errorInputParameters,
            error : errors.array()
        });
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password,12)
    .then(hashedPassword => {
        UserModel.create({ name : name , email : email,password : hashedPassword})
            .then(user => {
                res.status(statusCode.Created).json({ 
                    messages : successMessages.successOperation,
                    user : user
                });
            })
            .catch(err => {
                return res.status(statusCode.UnprocessableEntity).json({
                    message : err
                });
            });
    })
    .catch(err => {
        return res.status(statusCode.UnprocessableEntity).json({
            message : err
        });
    });
};


export { registerUser };
