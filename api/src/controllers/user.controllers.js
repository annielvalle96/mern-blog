import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const passwordHash = await bcryptjs.hash(password, 10)
    const newUser = new User({ username, password: passwordHash })
    const userSaved = await newUser.save()
    return res.status(200).json({
      id: userSaved.id,
      username: userSaved.username,
      password: userSaved.password
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Creación del Token.
const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 4 }, (error, token) => { error ? reject(error) : resolve(token) })
  })
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const userFound = await User.findOne({ username })
    if (!userFound) throw Error('User not found!')
    const isValidPassword = await bcryptjs.compare(password, userFound.password)
    if (!isValidPassword) throw Error('Invalid Password!')
    const token = await createAccessToken({ id: userFound.id })
    return res.status(200).cookie('token', token).json({
      id: userFound.id,
      username: userFound.username,
      password: userFound.password
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const profile = async (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Token not found!' })
    jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
      if (error) return res.status(401).json({ message: 'Token not verified!' })
      const userFound = await User.findById(user.id)
      if (!userFound) return res.status(401).json({ message: 'User not found!' })
      return res.json(userFound)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  try {
    // Limpiar el valor del Token y quitar la fecha de expiración.
    res.cookie('token', '', { expires: new Date(0) })
    return res.status(200).json({ message: 'User is logout!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
