
import { Link, useLocation } from 'react-router-dom'
import styles from './navbar.module.scss'

export const Navbar = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[1]

  return (
    <nav>
      <div className={styles.containerItems}>
        <Link className={path == 'configuration' ? styles.active : ''} to="/configuration">Configuración</Link>
        <Link className={path == 'campaigns' ? styles.active : ''} to="/campaigns">Campañas</Link>
      </div>
      <div className={styles.logo}>
        <h2>Faysu</h2>
      </div>
    </nav>
  )
}
