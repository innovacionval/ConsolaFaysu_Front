
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './navbar.module.scss'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { FiLogOut } from "react-icons/fi";
import imageLogo from '@/assets/images/Faysu.png'


export const Navbar = () => {
  const { logout } = useContext(AuthContext)
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const navigate = useNavigate()

  const handleToHome = () => {
    navigate('/')
  }

  return (
    <nav>
      <div className={styles.containerItems}>
      <div onClick={handleToHome} className={styles.logo}>
        <img width={60} src={imageLogo} alt="Faysu" />
      </div>
        <Link className={path == 'configuration' ? styles.active : ''} to="/configuration">Configuración</Link>
        <Link className={path == 'campaigns' ? styles.active : ''} to="/campaigns">Campañas</Link>
      </div>
      <div className={styles.containerLogout}>
        <button to="/login"  onClick={logout}>
          <Link to="/login">Cerrar sesión<FiLogOut />
          </Link>
        </button>
      </div>
    </nav>
  )
}
