import { useState } from 'react'
import axios from 'axios'

// Crear una instancia de; axios, para poder hacer algunas configuraciones a dicha librería.
const axiosInstance = axios.create({
  // Dominio base de la api por el que siempre va a hacer las onsultas.
  baseURL: 'http://localhost:4000/api',
  // Permite extrablecer las cookies en la app que hace las peticiones.
  withCredentials: true
})

export default function RegisterPage () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const register = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/register', { username, password })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form className='register' onSubmit={register}>
      <h1>Register</h1>
      <input
        type='text'
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  )
}
