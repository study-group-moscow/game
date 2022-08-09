import { Request, Response } from 'express';
import { PostModel } from '../db/models/PostModel';
import { UserModel } from '../db/models/UserModel';

export default class PostController {
  static async createPost(req: Request, res: Response) {
    const { content, likes, user_id } = req.body;
    try {
      const newPost = await PostModel.create({ content, likes, user_id })
      res.status(201).json(newPost)
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка создания поста'
        });
    }
  }

  static async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await PostModel.update(req.body, { where: { id } })
      res.status(200).json(post)
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка редактирования поста'
        });
    }
  }

  static async getPosts(req: Request, res: Response) {
    try {
      const posts = await PostModel.findAll({
        include: UserModel,
        order: [['id', 'DESC']]
      });
      res.status(200)
        .json(posts);
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка запроса постов'
        });
    }
  }

  static async getPostsByUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const posts = await PostModel.findOne({ where: { id } })
      res.status(200)
        .json(posts)
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Пост не найден'
        });
    }
  }

  static async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const posts = await PostModel.destroy({ where: { id } })
      res.status(200)
        .json(posts)
    } catch (e) {
      res.status(500)
        .json({
          reason: 'Ошибка удаления поста'
        });
    }
  }
}

