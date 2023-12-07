import { useEffect, useState } from 'react'
import Post from '../components/Post.jsx'
import axios from 'axios'

// Crear una instancia de; axios, para poder hacer algunas configuraciones a dicha librería.
const axiosInstance = axios.create({
  // Dominio base de la api por el que siempre va a hacer las onsultas.
  baseURL: 'http://localhost:4000/api',
  // Permite extrablecer las cookies en la app que hace las peticiones.
  withCredentials: true
})

export default function IndexPage () {
  const [posts, setPosts] = useState([])

  const loadPosts = async () => {
    try {
      const res = await axiosInstance.get('/post')
      setPosts(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </>
  )
}
