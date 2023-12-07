import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import TextEditor from '../components/TextEditor.jsx'

// Crear una instancia de; axios, para poder hacer algunas configuraciones a dicha librería.
const axiosInstance = axios.create({
  // Dominio base de la api por el que siempre va a hacer las onsultas.
  baseURL: 'http://localhost:4000/api',
  // Permite extrablecer las cookies en la app que hace las peticiones.
  withCredentials: true
})

export default function EditPostPage () {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState([])
  const [content, setContent] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { id } = useParams()

  const updatePost = async (e) => {
    // To get the data.
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])
    e.preventDefault()
    try {
      const res = await axiosInstance.put(`/post/${id}`, data)
      if (res.status === 200) setRedirect(true)
    } catch (e) {
      console.log(e)
    }
  }

  const loadPostToEdit = async () => {
    const res = await axiosInstance.get(`/post/${id}`)
    setTitle(res.data.title)
    setSummary(res.data.summary)
    setContent(res.data.content)
  }

  useEffect(() => {
    loadPostToEdit()
  }, [])

  if (redirect) return <Navigate to={`/post/${id}`} />

  return (
    <form onSubmit={updatePost}>
      <input type='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
      <input type='summary' placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
      <input type='file' onChange={e => setFiles(e.target.files)} />
      <TextEditor value={content} onChange={newValue => setContent(newValue)} />
      <button className='create-post'>Edit post</button>
    </form>
  )
}
