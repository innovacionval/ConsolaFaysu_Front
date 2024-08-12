import { useState } from "react"
import styles from "./MultipleSelect.module.scss"

export const MultipleSelect = ({clients, setClients, data}) => {
  const [isOpen, setIsOpen] = useState(false)
  const openSelect = () => {
    setIsOpen(!isOpen)
  }
  const handleClient = (client) => {
    if(clients.includes(client)){
      setClients(clients.filter((item) => item !== client))
    }else{
      setClients([...clients, client])
    }
  }
  return (
    <div className={styles.container}>
      <button type="button" onClick={openSelect}>Seleccionar Clientes</button>
      {
        isOpen && (
          <div className={styles.containerOptions}>
            {
              data.map((item, index) => (
                <button onClick={() => handleClient(item.value)} type="button" className={styles.options} id={clients.includes(item.value) ? styles.active : null } key={index}>
                  <label htmlFor={item}>{item.label}</label>
                </button>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
