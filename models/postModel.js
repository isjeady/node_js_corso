import { Sequelize } from "sequelize";
import { sequelize } from "../utils/database/sequelize.js";

const PostModel = sequelize.define('post',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    title : {
        type: Sequelize.STRING,
        allowNull : false,
    },      
    description : {
        type: Sequelize.STRING,
        allowNull : true,
    },
    image : {
        type: Sequelize.STRING,
        allowNull : true
    }      
});

export { PostModel }