import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, trim: true, min: 4, unique: true },
  password: { type: String, require: true }
})

export default mongoose.model('User', userSchema, 'users')
