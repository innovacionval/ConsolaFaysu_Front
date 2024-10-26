import { useContext } from 'react'
import styles from './alertModal.module.scss'
import { AuthContext } from '@/contexts/AuthContext'
import { MdError } from 'react-icons/md'
export const AlertModal = () => {
  const {setErrorModal} = useContext(AuthContext)
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>¡Atención!</h2>
          <MdError />
        </div>
        <div className={styles.body}>
          <p className={styles.text}>Ha ocurrido un error
            <br />
            Por favor, inténtalo mas tarde
          </p>
        </div>
        <div className={styles.footer}>
          <button onClick={() => setErrorModal(false)} className={styles.button}>Aceptar</button>
        </div>
      </div>
    </div>

  )
}
