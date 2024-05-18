import styles from './login.module.scss'
import imagenLogin from '../../assets/images/FAYSU 3_0014.png'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
export const Login = () => {
  const {register, handleSubmit} = useForm()
  const{login} = useContext(AuthContext)

  const onSubmit = (data) => {
    login(data.user, data.password)
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerLogin}>
        <img src={imagenLogin} alt="imagenLogin" className={styles.imagenLogin} />
        <div className={styles.containerForm}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit(data => onSubmit(data)) }>
            <input type="text" placeholder="Usuario" className={styles.input} {...register('user')} />
            <input type="password" placeholder="Contraseña" className={styles.input} {...register('password')} />
            <button type="submit" className={styles.button}>Ingresar</button>
          </form>
          <a className={styles.text}><span >¿Olvidaste tu contraseña?</span></a>
        </div>
      </div>
    </div>
  )
}
