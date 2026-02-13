import express from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(createPost);

router.route('/:slug')
  .get(getPostBySlug);

router.route('/id/:id')
  .put(updatePost)
  .delete(deletePost);

export default router;
