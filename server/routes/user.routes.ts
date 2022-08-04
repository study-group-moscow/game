import express from 'express';
const router = express.Router();
import userController from '../controller/user.controller';
router.post('', userController.createUser);
router.get('', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.patch('', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
