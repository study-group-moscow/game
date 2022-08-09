import { Sequelize } from 'sequelize';

declare let process : {
  env: {
    DB_PORT: number,
    DB_HOST: string,
    DB_PASSWORD: string,
    DB_USER_NAME: string,
    DB: string
  }
}
export const db = new Sequelize(
  process.env.DB,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)
