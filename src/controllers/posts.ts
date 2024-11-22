import type { Request, Response } from 'express'
import { Post, postZodSchema } from '../models/Post'
import { io } from '..'

export const createPost = async (req: Request, res: Response) => {
  // validate the request body with the zod schema
  const result = postZodSchema.safeParse(req.body.post)

  if (!result.success) {
    res.status(400).send(result.error.errors);
  }

  try {
    await Post.create(result.data)
    // emit the new post to all connected clients
    io.emit('newPost', result.data)
    res.status(201).send(result.data)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find()
    res.send(posts)
  } catch (error) {
    res.status(500).send(error)
  }
}
