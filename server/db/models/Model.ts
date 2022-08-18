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

PostModel.belongsTo(UserModel, {
  foreignKey: 'user_id'
});

async function create_table() {
  await UserModel.sync();
  await PostModel.sync();
}

async function run() {
  await create_table()
}

run()
