import express from 'express';
const router = express.Router();
import postController from '../controller/post.controller'


router.post('', postController.createPost);
router.get('', postController.getPosts);
router.get('/:id', postController.getPostsByUser);
router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);


export default router;
