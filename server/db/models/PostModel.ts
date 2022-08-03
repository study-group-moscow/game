import {db} from '../db';
import {DataTypes} from "sequelize";

export const PostModel = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    user_id: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'post',
    timestamps: false
});
