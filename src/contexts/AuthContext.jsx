import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { login } from "@/services/login.service";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const handleLogin = (username, password) => {
    login(username, password)
      .then((response) => {
        console.log(response)
        sessionStorage.setItem('token', response.access_token)
        sessionStorage.setItem('refreshToken', response.refresh_token)
        setIsValid(true)
      })
      .catch(() => {
        setIsValid(false)
      })
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
    sessionStorage.removeItem('refreshToken')
    setIsValid(null)
  }

  useEffect(() => {
    validateUser() ? setIsLogged(true) : setIsLogged(false)
  }, [isValid])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )

}