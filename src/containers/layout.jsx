import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar/navbar'
import styles from './layout.module.scss'

export const Layout = () => {

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.containerPages}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
