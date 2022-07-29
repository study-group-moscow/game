const db = require('../db/db')

class PostController {
    async createPost(req, res) {
        const {content,likes, userId, isLike, username} = req.body;
        const newPost = await db.query(`INSERT INTO "post" (content, likes, user_id, isLike, username)
                                        values ($1, $2, $3, $4, $5)
                                        RETURNING *`, [content, likes, userId, isLike, username]);
        res.json(newPost.rows[0]).status(200);
    }

    async getPosts(req, res) {
        const posts = await db.query('SELECT * FROM "post"');
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
