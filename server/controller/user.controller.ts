const db = require('../db/db');
import {Request, Response} from 'express';

class UserController {
    async createUser(req: Request, res: Response) {
        const {id, first_name, second_name, display_name, theme, score} = req.body;
        const newUser = await db.query(`INSERT INTO "user" (id, first_name, second_name, display_name, theme, score)
                                        values ($1, $2, $3, $4, $5, $6)
                                        RETURNING *`, [id, first_name, second_name, display_name, theme, score]);
        res.json(newUser.rows[0]).status(200);
    }

    async getUsers(req: Request, res: Response) {
        const users = await db.query('SELECT * FROM "user"');
        res.json(users.rows).status(200);
    }

    async getOneUser(req: Request, res: Response) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM "user" where id = $1', [id]);
        res.json(user.rows[0]).status(200);
    }

    async updateUser(req: Request, res: Response) {
        const {id, first_name, second_name, display_name, theme, score} = req.body;
        const user = await db.query('UPDATE "user" set first_name = $1, second_name = $2, display_name = $3, theme = $4, score = $5 where id = $6 RETURNING *', [first_name, second_name, display_name, theme, score, id]);
        res.json(user.rows[0]).status(200);
    }

    async deleteUser(req: Request, res: Response) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM "user" where id = $1', [id]);
        res.json(user.rows[0]).status(200);
    }
}

module.exports = new UserController();
