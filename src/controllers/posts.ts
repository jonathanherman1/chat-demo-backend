import type { Request, Response } from 'express'
import { Post, postZodSchema } from '../models/Post'
import { io } from '..'

export const createPost = async (req: Request, res: Response) => {
  // validate the request body with the zod schema
  const result = postZodSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).send(result.error.errors);
    return
  }

  try {
    const createResult = await Post.create(result.data)
    // emit the new post to all connected clients
    io.emit('newPost', createResult)
    res.status(201).send(result.data)
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.send(posts)
    return
  } catch (error) {
    res.status(500).send(error)
    return
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = postZodSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).send(result.error.errors)
    return
  }

  try {
    const updateResult = await Post.findByIdAndUpdate(id, result.data, { new: true })
    if (!updateResult) {
      res.status(404).send({ message: 'Post not found' })
      return
    }
    io.emit('updatePost', updateResult)
    res.send(updateResult)
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deleteResult = await Post.findByIdAndDelete(id)
    if (!deleteResult) {
      res.status(404).send({ message: 'Post not found' })
      return
    }
    io.emit('deletePost', id)
    res.send({ message: 'Post deleted successfully' })
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}
