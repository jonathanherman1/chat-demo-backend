import { Router } from 'express'
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/posts'

const router = Router()

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)

export default router
