import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import TextEditor from '../components/TextEditor'

// Crear una instancia de; axios, para poder hacer algunas configuraciones a dicha librería.
const axiosInstance = axios.create({
  // Dominio base de la api por el que siempre va a hacer las onsultas.
  baseURL: 'http://localhost:4000/api',
  // Permite extrablecer las cookies en la app que hace las peticiones.
  withCredentials: true
})

export default function CreatePostPage () {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState('')
  const [content, setContent] = useState('')
  const [redirect, setRedirect] = useState(false)

  const createNewPost = async (e) => {
    // To get the data.
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])
    e.preventDefault()
    try {
      if (files) {
        const res = await axiosInstance.post('/post', data)
        if (res.status === 200) {
          setRedirect(true)
        }
      } else {
        alert('You must fill in all fields!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (redirect) return <Navigate to='/' />

  return (
    <form onSubmit={createNewPost}>
      <input type='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
      <input type='summary' placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
      <input type='file' onChange={e => setFiles(e.target.files)} />
      <TextEditor value={content} onChange={newValue => setContent(newValue)} />
      <button className='create-post'>Create post</button>
    </form>
  )
}
