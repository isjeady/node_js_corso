import express from "express";
import { loginMe } from "../controllers/auth/index.js";
import { getPostByMe, getPostsByMe } from "../controllers/user/user.controller.js";
import { isAuth } from "../middleware/is-auth.js";
import { POSTS } from "./routes.js";
const router = express.Router();

router.get('/me', isAuth, loginMe);
router.get(`${POSTS}`,isAuth, getPostsByMe);
router.get(`${POSTS}/:id`,isAuth, getPostByMe);

const userRoutes = router;
export default userRoutes;