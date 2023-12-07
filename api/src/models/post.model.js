import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    summary: { type: String },
    content: { type: String },
    cover: { type: String },
    author: { type: Schema.Types.ObjectId, ref:'User' }
  }, {
    timestamps: true
  }
)

export default mongoose.model('Post', postSchema, 'posts')
