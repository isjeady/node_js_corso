import { Sequelize } from "sequelize";
import { sequelize } from "../utils/database/sequelize.js";

const LikeModel = sequelize.define('like',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    }
});

export { LikeModel }