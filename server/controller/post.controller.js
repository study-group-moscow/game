const db = require('../db/db')

class PostController {
    async createPost(req, res) {
        const {title, content, userId} = req.body;
        const newPost = await db.query(`INSERT INTO "post" (title, content, user_id)
                                        values ($1, $2, $3)
                                        RETURNING *`, [title, content, userId]);
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