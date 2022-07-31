import express from 'express';
const router = express.Router();
const postController = require('../controller/post.controller');


router.post('', postController.createPost);
router.get('', postController.getPosts);
router.get('/:id', postController.getPostsByUser);
router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);


module.exports = router;
