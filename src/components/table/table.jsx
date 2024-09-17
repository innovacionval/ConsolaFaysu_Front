
import { Switch } from '../shared/switch/Swtich'
import styles from './table.module.scss'

export const Table = ({labels, data, actions}) => {
  const labelNames = new Set(labels.map(label => label.name));
  return (
    <div className={styles.containerTable}>
      <table>
        <thead>
          <tr>
            {
              labels.map((label, index) => (
                <th key={index}>{label.label}</th>
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
                    if (!labelNames.has(key)) return null;
                    if (key == 'statusUser') {
                      return <td key={index} className={item[key] ? styles.active : styles.inactive}>{item[key] ? 'Activo' : 'Inactivo'}</td>
                    }
                    if (key == 'status') {
                      return <td key={index} className={item[key] == "Vigente" ? styles.active : styles.inactive}>{item[key]}</td>
                    }
                    if(key == 'logo') {
                      return <td key={index}>
                        <img width="50px" src={item[key]} alt="logo" />
                      </td>
                    }
                    if(key == 'primaryColor' || key == 'secondaryColor') {
                      return <td key={index}>
                        <div className={styles.containerColor}>
                          <label htmlFor={key}>{item[key]}</label>
                          <input style={{
                            width: '20px',
                            height: '20px',
                            border: '1px solid black',
                            backgroundColor: item[key],
                          }} type="color" value={item[key]} disabled  />
                        </div>
                      </td>
                    }
                    return <td key={index}>{item[key]}</td>
                  })
                }
                <td >
                  <div className={styles.actions}>
                  {
                    actions.map((action, index) => {
                      if (action.name === 'switch') {
                        return <Switch key={`${index} + $`} isOn={item.statusUser || item.status || item.active  || item.status =="Vigente"} handleToggle={() => action.action(item.id)} id={item.id} />;
                      }
                      return (
                        <button className={styles.action} key={index} onClick={() => action.action(item.id)}>
                          {action.icon}
                        </button>
                      );
                    })
                  }
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
