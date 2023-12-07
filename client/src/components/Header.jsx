import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../contexts/UserContext.jsx'

// Crear una instancia de; axios, para poder hacer algunas configuraciones a dicha librería.
const axiosInstance = axios.create({
  // Dominio base de la api por el que siempre va a hacer las onsultas.
  baseURL: 'http://localhost:4000/api',
  // Permite extrablecer las cookies en la app que hace las peticiones.
  withCredentials: true
})

export default function Header () {
  const { userinfo, setUserinfo } = useUser()
  const navegate = useNavigate()

  const loadProfile = async (e) => {
    try {
      const res = await axiosInstance.get('/profile')
      setUserinfo(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const logout = async () => {
    try {
      const res = await axiosInstance.post('/logout')
      if (res.status === 200) {
        setUserinfo(null)
        navegate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const username = userinfo?.username

  return (
    <header>
      <Link to='/' className='logo'>MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
