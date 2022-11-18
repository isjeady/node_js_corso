import authRoutes from "./auth.routes.js";
import galleryRoutes from "./gallery.routes.js";
import postsRoutes from "./posts.routes.js";
import { API, POSTS, AUTH, GALLERY } from "./routes.js";


const routes = (app) =>  {
     app
        .use(`${API}${AUTH}`, authRoutes)
        .use(`${API}${POSTS}`, postsRoutes)
        .use(`${API}${GALLERY}`, galleryRoutes); 
}; 


export default routes;

//---------------------------NO AUTH | AUTH - 7 END POINT
//*GET ALL /posts
//*GET /post/:id
//*GET SEARCH /post/search ? title = 
//*GET BY ME /post/:id
//*POST /post
//*PUT /post/:id
//*DELETE /post/:id
//*POST /post/:id/like
//--------------------------
//-----> JWT  //4 END POINT
//*POST /user/login
//*POST /user/register
//*GET  /user/me
//PUT  /user/:id   //verificare permessi


