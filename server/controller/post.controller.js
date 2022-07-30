const db = require('../db/db')

class PostController {
    async createPost(req, res) {
        const {content,likes, userId, islike} = req.body;
        const newPost = await db.query(`INSERT INTO "post" (content, likes, user_id, islike)
                                        values ($1, $2, $3, $4)
                                        RETURNING *`, [content, likes, userId, islike]);
      const id = newPost.rows[0].id;
      const post = await db.query('SELECT p.id, p.user_id, u.name, p.content, p.likes, p.islike, p.id as post_id FROM "post" as p join "user" u on u.id = p.user_id where p.id = $1', [id]);
      console.log(post.rows[0])
      res.json(post.rows[0]).status(200);
    }

    async getPosts(req, res) {
        const posts = await db.query('SELECT p.id, p.id as post_id,  p.content, p.likes, p.islike, p.user_id, u.name FROM "post" as p join "user" u on u.id = p.user_id\n');
        res.json(posts.rows).status(200);
    }

    async getPostsByUser(req, res) {
        const id = req.params.id;
        const posts = await db.query('SELECT * FROM "post" where user_id = $1', [id]);
        res.json(posts.rows).status(200);
    }

    async deletePost(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM "post" where id = $1', [id]);
        res.json(user.rows[0]).status(200);
    }

}

module.exports = new PostController;
