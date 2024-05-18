import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('token', '1234')
      setIsValid(true)
    }
  }

  const validateUser = () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setIsValid(false)
  }

  useEffect(() => {
    validateUser() ? setIsLogged(true) : setIsLogged(false)
  }, [isValid])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )

}