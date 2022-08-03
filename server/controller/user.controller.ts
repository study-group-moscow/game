import {Request, Response} from 'express';
import {UserModel} from "../db/models/UserModel";

class UserController {
    async createUser(req: Request, res: Response) {
        const {id, first_name, second_name, display_name, theme, score} = req.body;
        const newUser = await UserModel.create({id, first_name, second_name, display_name, theme, score});
        res.status(201).json(newUser);
    }

    async getUsers(req: Request, res: Response) {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    }

    async getOneUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await UserModel.findOne({where: {id}});
        res.status(200).json(user);
    }

    async updateUser(req: Request, res: Response) {
        const user = await UserModel.update(req.body, {where: {id: req.body.id}});
        res.status(200).json(user);
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await UserModel.destroy({where: {id}});
        res.status(200).json(user);
    }
}

module.exports = new UserController();
