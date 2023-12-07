import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

// Crear una instancia de; axios, para poder hacer algunas configuraciones a dicha librería.
const axiosInstance = axios.create({
  // Dominio base de la api por el que siempre va a hacer las onsultas.
  baseURL: 'http://localhost:4000/api',
  // Permite extrablecer las cookies en la app que hace las peticiones.
  withCredentials: true
})

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserinfo } = useUser()

  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/login', { username, password })
      if (res.status === 200) {
        setUserinfo(res.data)
        setRedirect(true)
      }
    } catch (e) {
      console.log()
    }
  }

  if (redirect) return <Navigate to='/' />

  return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>
      <input
        type='text'
        placeholder='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  )
}
