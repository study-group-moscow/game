import { DataTypes } from 'sequelize'
import { db } from '../db'
import { PostModel } from './PostModel';

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

async function create_table() {
  await UserModel.sync();
  await PostModel.sync();
}

async function run() {
  await create_table()
}

run()
