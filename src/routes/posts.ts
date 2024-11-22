import { Router } from 'express';
import { createPost, getPosts } from '../controllers/posts';

const router = Router();

// For the purposes of this demo we want both the base route and the /posts route to return the same data
const paths = ['/', '/posts']

paths.forEach(path => {
  router.get(path, getPosts)
  router.post(path, createPost)
})

export default router
