import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDatabase } from './DatabaseContext'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { dbService } = useDatabase()
  const navigate = useNavigate()

  // Cargar usuario desde IndexedDB al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await dbService.getUser()
        if (savedUser) {
          setUser(savedUser)
        }
      } catch (err) {
        console.error('Error al cargar usuario:', err)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [dbService])

  // Iniciar sesión
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:5800/api/Account/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'accept': '*/*'
        }
      })

      if (!response.ok) {
        throw new Error('Error de autenticación')
      }

      const userData = await response.json()

      if (userData.hasError) {
        throw new Error(userData.error || 'Error de autenticación')
      }

      // Guardar en IndexedDB
      await dbService.saveUser(userData)
      setUser(userData)
      return userData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Registrar usuario
  const register = async (userData) => {
    setLoading(true)
    setError(null)

    const { name, phoneNumber, role, userName, password, email, active } = userData

    try {
      const url = `http://localhost:5800/api/Account/Registro?name=${encodeURIComponent(name)}&phoneNumber=${encodeURIComponent(phoneNumber)}&role=${encodeURIComponent(role)}&userName=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&active=${active}`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': '*/*'
        }
      })

      if (!response.ok) {
        throw new Error('Error de registro')
      }

      const result = await response.json()

      if (result.hasError) {
        throw new Error(result.error || 'Error de registro')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Cerrar sesión
  const logout = async () => {
    try {
      await dbService.clearUser()
      setUser(null)
      navigate('/login')
    } catch (err) {
      console.error('Error al cerrar sesión:', err)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)