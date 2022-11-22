import { Sequelize } from "sequelize";
import { sequelize } from "../utils/database/sequelize.js";

const PostModel = sequelize.define('post',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    uuid : {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
    },      
    slug : {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
    },      
    title : {
        type: Sequelize.STRING,
        allowNull : false,
    },      
    teaser : {
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
    },      
    published : {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }      
});

export { PostModel }