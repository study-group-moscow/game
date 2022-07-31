const db = require('../db/db');
import {Request, Response} from 'express';

class PostController {
    async createPost(req: Request, res: Response) {
        const {content, likes, user_id} = req.body;
        const newPost = await db.query(`INSERT INTO "post" (content, likes, user_id)
                                        values ($1, $2, $3)
                                        RETURNING *`, [content, likes, user_id]);
       res.json(newPost.rows[0]).status(200);
    }

    async updatePost(req: Request, res: Response) {
      const { content, likes } = req.body;
      const id = req.params.id;
      const posts = await db.query('UPDATE post SET content = $2, likes = $3 WHERE id = $1', [id, content, likes]);
      res.json(posts.rows[0]).status(200);
    }

    async getPosts(req: Request, res: Response) {
        const posts = await db.query('SELECT p.id, p.content, p.likes, p.user_id, u.name FROM "post" as p join "user" u on u.id = p.user_id ORDER BY id');
        res.json(posts.rows).status(200);
    }

    async getPostsByUser(req: Request, res: Response) {
        const id = req.params.id;
        const posts = await db.query('SELECT * FROM "post" where user_id = $1', [id]);
        res.json(posts.rows).status(200);
    }

    async deletePost(req: Request, res: Response) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM "post" where id = $1', [id]);
        res.json(user.rows[0]).status(200);
    }

}

module.exports = new PostController;
