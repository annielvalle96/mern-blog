import './App.css'
import Layout from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import PostPage from './pages/PostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'

function App () {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePostPage />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPostPage />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}
export default App
