
import { sequelize } from "./sequelize.js";
import { LikeModel } from "../../models/likeModel.js";
import { PostModel } from "../../models/postModel.js";
import { UserModel } from "../../models/userModel.js";

UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel,{ constraints : true, onDelete : 'CASCADE'});

UserModel.belongsToMany(PostModel,{ through : LikeModel});
PostModel.belongsToMany(UserModel,{ through : LikeModel});  

const sequelizeAuthenticate = () => {

    sequelize.authenticate().then( rec => {
        console.log('Connessione Stabilita con Successo');
        //sequelize.sync({force:true})
        sequelize.sync()
        .then(user => {
            console.log('Sync al DB con Successo');
        }).catch( err => {
            console.log('Sync al DB Error:',err);
        });
    }).catch( err => {
         console.log('Connession al DB Error:',err);
    });

}

export { sequelizeAuthenticate };
