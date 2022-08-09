import express from 'express'
import UserController from '../controller/user.controller'

const router = express.Router()

router.post('', UserController.createUser)
router.get('', UserController.getUsers)
router.get('/:id', UserController.getOneUser)
router.patch('', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router
