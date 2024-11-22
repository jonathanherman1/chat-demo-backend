import type { Request, Response } from 'express'
import { Post, postZodSchema } from '../models/Post'
import { io } from '..'

export const createPost = async (req: Request, res: Response) => {
  // validate the request body with the zod schema
  const result = postZodSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).send(result.error.errors);
  }

  try {
    await Post.create(result.data)
    // emit the new post to all connected clients
    io.emit('newPost', result.data)
    return res.status(201).send(result.data)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find()
    return res.send(posts)
  } catch (error) {
    return res.status(500).send(error)
  }
}
