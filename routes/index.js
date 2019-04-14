const feedRoutes = require ('./feed');
const authRoutes = require ('./auth');
const galleryRoutes = require ('./gallery');

module.exports = function (app) {
    app.use('/feed',feedRoutes).use('/auth',authRoutes).use('/gallery',galleryRoutes);
};


//---------------------------NO AUTH | AUTH - 7 END POINT
//*GET ALL /feed/posts
//*GET /feed/post/:id
//*GET SEARCH /feed/post/search ? title = 
//*GET BY ME /feed/post/:id
//*POST /feed/post
//*PUT /feed/post/:id
//*DELETE /feed/post/:id
//*POST /feed/post/:id/like
//--------------------------
//-----> JWT  //4 END POINT
//*POST /user/login
//*POST /user/register
//*GET  /user/me
//PUT  /user/:id   //verificare permessi


