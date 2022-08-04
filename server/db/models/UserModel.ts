import { DataTypes } from 'sequelize'
import { db } from '../db'

export const UserModel = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING
  },
  second_name: {
    type: DataTypes.STRING
  },
  display_name: {
    type: DataTypes.STRING
  },
  theme: {
    type: DataTypes.STRING
  },
  score: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'user',
  timestamps: false
})
