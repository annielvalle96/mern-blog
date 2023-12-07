// Importar la librería del sistema para el manejo de archivos.
import fs from 'fs'
import Post from '../models/post.model.js'
import jwt from 'jsonwebtoken'

export const createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    const { token } = req.cookies
    jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
      if (error) return res.status(401).json({ message: 'Token not verified!' })
      const { title, summary, content } = req.body
      const post = await Post.create({ title, summary, content, cover: newPath, author: user.id })
      return res.status(200).json(post)
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20)
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author')
    if (!post) return res.status(404).json({ message: 'Post not found!' })
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    let newPath = post.cover
    if (req.file) {
      fs.unlink(newPath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      })
      const { originalname, path } = req.file
      const parts = originalname.split('.')
      const ext = parts[parts.length - 1]
      newPath = path + '.' + ext
      fs.renameSync(path, newPath)
    }   
    const { token } = req.cookies
    jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
      if (error) return res.status(401).json({ message: 'Token not verified!' })
      const { title, summary, content } = req.body
      const postUpdated = await Post.findByIdAndUpdate({ _id: req.params.id }, { title, summary, content, cover: newPath, author: user.id }, { new: true }).populate('author', ['username'])
      return res.status(200).json(postUpdated)
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
