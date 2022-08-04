import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 7777
  }
)
