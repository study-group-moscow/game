import express from 'express'
import PostController from '../controller/post.controller'

const router = express.Router();

router.post('', PostController.createPost)
router.get('', PostController.getPosts)
router.get('/:id', PostController.getPostsByUser)
router.delete('/:id', PostController.deletePost)
router.put('/:id', PostController.updatePost)

export default router
