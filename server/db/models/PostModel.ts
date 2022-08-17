import { DataTypes } from 'sequelize'
import { db } from '../db'
import { UserModel } from './UserModel';

export const PostModel = db.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING
  },
  likes: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: 'id'
    }
  }
}, {
  tableName: 'post',
  timestamps: false
});
