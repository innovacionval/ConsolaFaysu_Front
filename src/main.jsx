import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import './styles/globals.scss'
import { AuthProvider } from './contexts/AuthContext'
import { ModalProvider } from './contexts/modalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ModalProvider>
  </React.StrictMode>,
)
