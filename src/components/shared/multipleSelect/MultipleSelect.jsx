import { useState } from "react"
import styles from "./MultipleSelect.module.scss"

export const MultipleSelect = ({input, data}) => {
  const [isOpen, setIsOpen] = useState(false)
  const openSelect = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className={styles.container}>
      <button type="button" onClick={openSelect}>{input.label}</button>
      {
        isOpen && (
          <div className={styles.containerOptions}>
            {
              data.map((item, index) => (
                <div className={styles.options} key={index}>
                  <label htmlFor={item}>{item.name}</label>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
