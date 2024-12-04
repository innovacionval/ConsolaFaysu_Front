import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { login } from "@/services/login.service";
import { LoadingContext } from "./LoadingContext";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const {setLoading} = useContext(LoadingContext);
  const [user, setUser] = useState(null)
  const [errorModal, setErrorModal] = useState(false)

  const handleLogin = (username, password) => {
    setLoading(true)
    login(username, password)
      .then((response) => {
        setUser(jwtDecode(response.access_token))
        sessionStorage.setItem('token', response.access_token)
        sessionStorage.setItem('refreshToken', response.refresh_token)
        setIsValid(true)
      })
      .catch(() => {
        setErrorModal(true)
      }).finally(()=>setLoading(false))
  }

  const validateUser = () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      setUser(jwtDecode(token))
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
    <AuthContext.Provider value={{ isLogged, setIsLogged, handleLogin, logout, setErrorModal, errorModal, user }}>
      {children}
    </AuthContext.Provider>
  )

}