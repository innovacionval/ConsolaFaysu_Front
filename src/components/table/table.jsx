
import styles from './table.module.scss'

export const Table = ({labels, data}) => {
  return (
    <div className={styles.containerTable}>
      <table>
        <thead>
          <tr>
            {
              labels.map((label, index) => (
                <th key={index}>{label}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                {
                  Object.keys(item).map((key, index) => (
                    <td key={index}>{item[key]}</td>
                  ))
                }
                <td className={styles.actions}>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
