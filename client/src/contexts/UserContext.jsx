import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

// Creando un hook que me provee el contexto para luego solo usar el contexto y ya.
// Este hook es para, en vez de estar importando 'AuthContext' y 'useContext', solo importatr el hook 'useAuth' y tendremos acceso el contexto.
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const UserProvider = ({ children }) => {
  const [userinfo, setUserinfo] = useState(null)

  return (
    <UserContext.Provider value={{ userinfo, setUserinfo }}>
      {children}
    </UserContext.Provider>
  )
}
