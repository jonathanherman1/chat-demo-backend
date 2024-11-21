import mongoose, { Schema, Document } from 'mongoose'

type TPost = Document & {
  createdAt: Date
  message: string
  name: string
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
  name: {
    type: String,
    required: true,
  },
})

export const Post = mongoose.model<TPost>('Post', postSchema)
