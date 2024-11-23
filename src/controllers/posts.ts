import type { Request, Response } from 'express'
import { Post, postZodSchema } from '../models/Post'
import { getIo } from '../config/socket-io'

/** Creates a post in MongoDB.
 * 
 * Validates the request body with the postZodSchema.
 * If the request body is invalid, sends a 400 response with the validation errors.
 * If the request body is valid, creates a new post in MongoDB and emits the new post to all connected clients.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 201 response with the created post if successful, or a 400 response with an error message if unsuccessful.
 */
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
    const io = getIo()
    io.emit('newPost', createResult)
    res.status(201).send(result.data)
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}

/** Retrieves all posts from MongoDB.
 * 
 * Retrieves all posts from MongoDB and sorts them by the createdAt field in descending order.
 * 
 * @param _ - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 200 response with all the posts if successful, or a 500 response with an error message if unsuccessful.
 */
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

/** Retrieves a post by ID from MongoDB.
 * 
 * Retrieves a post by ID from MongoDB.
 * If the post is not found, sends a 404 response with an error message.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 200 response with the post if successful, or a 404 response with an error message if unsuccessful.
 */
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
    const io = getIo()
    io.emit('updatePost', updateResult)
    res.send(updateResult)
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}

/** Deletes a post by ID from MongoDB.
 * 
 * Deletes a post by ID from MongoDB.
 * If the post is not found, sends a 404 response with an error message.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 200 response with a success message if successful, or a 404 response with an error message if unsuccessful.
 */
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deleteResult = await Post.findByIdAndDelete(id)
    if (!deleteResult) {
      res.status(404).send({ message: 'Post not found' })
      return
    }
    const io = getIo()
    io.emit('deletePost', id)
    res.send({ message: 'Post deleted successfully' })
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}
