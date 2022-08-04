import {Request, Response} from 'express';
import {PostModel} from '../db/models/PostModel';

class PostController {
    async createPost(req: Request, res: Response) {
        const {content, likes, user_id} = req.body;
        const newPost = await PostModel.create({content, likes, user_id});
        res.status(201).json(newPost);
    }

    async updatePost(req: Request, res: Response) {
        const {id} = req.params;
        const post = await PostModel.update(req.body, {where: {id}});
        res.status(200).json(post);
    }

    async getPosts(req: Request, res: Response) {
        const posts = await PostModel.findAll({
          order: [
            ['id', 'DESC'],
          ],
        });

      console.log(posts)
        res.status(200).json(posts);
    }

    async getPostsByUser(req: Request, res: Response) {
        const {id} = req.params;
        const posts = await PostModel.findOne({where: {id}});
        res.status(200).json(posts);
    }

    async deletePost(req: Request, res: Response) {
        const {id} = req.params;
        const posts = await PostModel.destroy({where: {id}});
        res.status(200).json(posts);
    }
}

export default new PostController();
