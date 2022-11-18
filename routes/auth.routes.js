import express from "express";
import { body } from "express-validator";
import { loginMe, loginUser, registerUser } from "../controllers/auth/index.js";
import { isAuth } from "../middleware/is-auth.js";
import { UserModel } from "../models/userModel.js";
import { errorsMessages } from "../utils/messages.js";
import { REGISTER } from "./routes.js";
const router = express.Router();

//POST /auth/register
router.post(REGISTER,
    [
        body('email').isEmail().withMessage(errorsMessages.register.mailNotValid)
        .custom((value,{ req }) => {
            return UserModel.findOne( { where : { email : value}}).then(user => {
                if(user){
                    return Promise.reject(errorsMessages.register.mailExist);
                }
            })
        }),
        body('password').trim().isLength({ min : 5}).withMessage(errorsMessages.register.passwordNotValid),
        body('name').trim().not().isEmpty().withMessage(errorsMessages.register.nameNotValid)
    ],
    registerUser);

router.post('/login',
    [
        body('email').isEmail().withMessage(errorsMessages.register.mailNotValid),
        body('password').trim().isLength({ min : 5}).withMessage(errorsMessages.register.passwordNotValid)
    ],
   loginUser);


router.get('/me', isAuth, loginMe);

const authRoutes = router;
export default authRoutes;