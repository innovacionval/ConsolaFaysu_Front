import styles from './Loading.module.scss'
export const Loading = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  )
}
