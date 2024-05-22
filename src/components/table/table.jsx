
import styles from './table.module.scss'

export const Table = ({labels, data, actions}) => {
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
                  Object.keys(item).map((key, index) => {
                    if (key == 'status') {
                      return <td key={index} className={item[key] == "Activo" ? styles.active : styles.inactive}>{item[key]}</td>
                    }
                    return <td key={index}>{item[key]}</td>
                  })
                }
                <td className={styles.actions}>
                  {
                    actions.map((action, index) => (
                      <button key={index} onClick={action.action}>{action.name}</button>
                    ))
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
