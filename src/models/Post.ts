import mongoose, { Schema, Document } from 'mongoose'

type TPost = Document & {
  createdAt: Date
  message: string
  username: string
}

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
