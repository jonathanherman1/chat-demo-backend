import mongoose, { Schema, Document } from 'mongoose'
import { z } from 'zod'

export const postZodSchema = z.object({
  createdAt: z.date().optional(),
  message: z.string().min(1, "Message required"),
  username: z.string().min(1, "Username required"),
})

type PostBase = z.infer<typeof postZodSchema>

type TPost = Document & PostBase

const postSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

export const Post = mongoose.model<TPost>('Post', postSchema)
