import imageHome from '@/assets/images/FAYSU 5_0014.png'
import styles from './home.module.scss'
export const Home = () => {
  return (
    <div className={styles.containerHome}>
      <img src={imageHome} alt="imagenHome"/>
      <h2>
        Bienvenid@ a nuestro portal de notificaciones
      </h2>
    </div>
  )
}
