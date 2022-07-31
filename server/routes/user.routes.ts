import express from 'express';
const router = express.Router();
const userController = require('../controller/user.controller');


router.post('', userController.createUser);
router.get('', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.put('', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
