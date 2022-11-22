import authRoutes from "./auth.routes.js";
import galleryRoutes from "./gallery.routes.js";
import postsRoutes from "./posts.routes.js";
import userRoutes from "./user.routes.js";
import { API, POSTS, AUTH, GALLERY,USER } from "./routes.js";


const routes = (app) =>  {
     app
        .use(`${API}${AUTH}`, authRoutes)
        .use(`${API}${POSTS}`, postsRoutes)
        .use(`${API}${GALLERY}`, galleryRoutes) 
        .use(`${API}${USER}`, userRoutes); 
}; 


export default routes;

//---------------------------PUBLIC END POINT
//*GET ALL /posts
//*GET /post/:id
//*GET SEARCH /post/search ? title = 

//*POST /auth/login
//*POST /auth/register

//---------------------------PRIVATE END POINT
//--------> USER END POINT
//*GET /user/me
//*GET /user/posts
//*GET /user/posts/:id
//--------> POSTS END POINT
//*POST /posts
//*PUT /posts/:id
//*DELETE /posts/:id
//*POST /posts/:id/like
//--------------------------


