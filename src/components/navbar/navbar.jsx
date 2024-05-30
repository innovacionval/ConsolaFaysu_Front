
import { Link, useLocation } from 'react-router-dom'
import styles from './navbar.module.scss'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export const Navbar = () => {
  const { logout } = useContext(AuthContext)
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  return (
    <nav>
      <div className={styles.containerItems}>
      <div className={styles.logo}>
        <h2>Faysu</h2>
      </div>
        <Link className={path == 'configuration' ? styles.active : ''} to="/configuration">Configuración</Link>
        <Link className={path == 'campaigns' ? styles.active : ''} to="/campaigns">Campañas</Link>
      </div>
      <div className={styles.containerLogout}>
        <button to="/login">
          <Link to="/login" onClick={logout}>Cerrar sesión</Link>
        </button>
      </div>
    </nav>
  )
}
