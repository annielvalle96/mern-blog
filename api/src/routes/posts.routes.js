import { Router } from 'express'
import { createPost, getPost, getPosts, updatePost } from '../controllers/post.controllers.js'
import multer from 'multer'

// Define the route where to upload the files to the server.
const uploadMiddleware = multer({ dest: './uploads' })

const router = Router()

router.post('/post', uploadMiddleware.single('file'), createPost)
router.get('/post', getPosts)
router.get('/post/:id', getPost)
router.put('/post/:id', uploadMiddleware.single('file'), updatePost)

export default router