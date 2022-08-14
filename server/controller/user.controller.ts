import { Request, Response } from 'express';
import { UserModel } from '../db/models/UserModel';

export default class UserController {
  static async createUser(req: Request, res: Response) {
    const { id, first_name, second_name, display_name, theme, score } = req.body;
    try {
      const newUser = await UserModel.create({
        id,
        first_name,
        second_name,
        display_name,
        theme,
        score
      });
      res.status(201).json(newUser);
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка добавления пользователя'
        });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка запроса пользователей'
        });
    }
  }

  static async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserModel.findOne({ where: { id } });
      res.status(200).json(user);
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка запроса пользователя'
        });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await UserModel.update(req.body, { where: { id: req.body.id } });
      res.status(200).json(user);
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка редактирования пользователя'
        });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserModel.destroy({ where: { id } });
      res.status(200).json(user);
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка удаления пользователя'
        });
    }
  }
}

