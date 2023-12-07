import express from 'express'
import cors from 'cors'
import connectDB from './src/db/db.connet.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import usersRouter from './src/routes/users.routes.js'
import cookieParser from 'cookie-parser'
import postsRouter from './src/routes/posts.routes.js'

// Usar las variables de entorno desde el archivo ".env".
dotenv.config()

// Ejecutar la conexión a la BD.
connectDB()

// Crear el servidor.
const app = express()

// Definición de CORS para indicar que: todos los dominio se puedan comunicar con este servidor.
// El argumento: {origin: 'http://localhost:5173'}, de la función cors() no es obligatorio usarlo.
// En este caso, dicho argumento está indicando que el servidor solo se conecte con la aplicación desplegada en: http://localhost:5173.
// El atributo: credentials: true, es para que la api, aquí en el backend pueda establecer las cookies.
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

// Mandar a escuchar al servidor en un puerto específico y devolver un mensaje por consola para saber si funciona esta operación.
app.listen(process.env.PORT, () => console.log(`>>> Server running: http://localhost:${process.env.PORT}`))

// "morgan('dev)" es para mostrar un mensaje corto por consola con las peticiones que llegan al backend para saber que peticiones estamos haciendo a cada momento.
app.use(morgan('dev'))

// "express.json() es para que express pueda convertir y reconocer los "req.body" en JSON.
app.use(express.json())

// Para poder leer cookies con req.cookies, necesitamos usar este middleware.
app.use(cookieParser())

// Poner la carpeta de las imágenes como estática para que el proyecto pueda leer de ella.
app.use('/uploads', express.static('./uploads'))

// Definiendo las rutas.
app.use('/api', usersRouter)
app.use('/api', postsRouter)