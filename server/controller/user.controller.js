const db = require('../db/db')

class UserController {
    async createUser(req, res) {
        const {name, theme} = req.body;
        const newUser = await db.query(`INSERT INTO "user" (name, theme)
                                        values ($1, $2)
                                        RETURNING *`, [name, theme]);
        res.json(newUser.rows[0]).status(200);
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM "user"');
        res.json(users.rows).status(200);
    }

    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM "user" where id = $1', [id]);
        res.json(user.rows[0]).status(200);
    }

    async updateUser(req, res) {
        const {id, name, theme} = req.body;
        const user = await db.query('UPDATE "user" set name = $1, theme = $2 where id = $3 RETURNING *', [name, theme, id]);
        res.json(user.rows[0]).status(200);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM "user" where id = $1', [id]);
        res.json(user.rows[0]).status(200);
    }
}

module.exports = new UserController();