import mongoose, { Schema, Document } from 'mongoose'
import { z } from 'zod'

/** Defines a Zod schema for the Post model. This is primarily used for data validation of incoming requests.
 * 
 * Note that we infer a TypeScript type from the Zod schema to use as the base type for the Post model.
*/
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
