import { ModalContext } from '@/contexts/modalContext';
import styles from './modal.module.scss'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

export const ModalUsers = () => {
  const {closeModal} = useContext(ModalContext);
  const {register, handleSubmit, formState:{errors}} = useForm();
  const handleClose = () => {
    closeModal("corporateEntity")
  }
  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Nombres",
      required: true,
    },
    {
      type: "text",
      name: "identity",
      label: "Identificación",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      type: "select",
      name: "role",
      label: "Rol",
      required: true,
      options: ["Admin", "User"],
    },
    {
      type: "radio",
      name: "status",
      label: "Estado",
      required: true,
      options: ["Activo", "Inactivo"],
    }
  ]

  const handleForm = (data) => {
    console.log(data)
  }


  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div></div>
          <h3>Usuarios</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <form onSubmit={handleSubmit(handleForm)} className={styles.body}>
          {
            inputs.map((input, index) => (
              <div className={styles.formGroup} key={`${input.name}${index}`}>
                <div className={styles.inputGroup}>
                  <label htmlFor={input.name}>{input.label}</label>
                  {
                    input.type == "select" ? (
                      <select {...register(input.name, {required: { value: input.required, message: input.label}})}>
                        {
                          input.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))
                        }
                      </select>
                    ) : input.type == "radio" ? (
                      input.options.map((option, index) => (
                        <div className={styles.radio} key={`${option} + ${index}`}>
                          <label htmlFor={option}>{option}</label>
                          <input type="radio" {...register(input.name, {required: { value: input.required, message: input.label}})} value={option}/>
                        </div>
                      ))
                    ) : (
                      <input key={index} type={input.type} {...register(input.name, {required: { value: input.required, message: input.label}})}/>
                    )
                  }
                </div>
                {errors[input.name] && <span className={styles.error}>{`El campo ${errors[input.name].message} es requerido`}</span>}
              </div>
            ))
          }
          <button type="submit"><BiSave />Guardar</button>
        </form>
      </div>
    </div>
  )
}
