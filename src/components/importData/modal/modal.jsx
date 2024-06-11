import { ModalContext } from '@/contexts/modalContext';
import styles from './modal.module.scss'
import { useContext, useEffect, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { useForm } from 'react-hook-form';

export const ModalImportData = () => {
  const {closeModal} = useContext(ModalContext);
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [fileName, setFileName] = useState("Archivo no seleccionado")
  const inputs = [
    {
      type: "date",
      name: "date",
      label: "Fecha",
      required: false,
      disabled: true,
    },
    {
      type: "text",
      name: "user",
      label: "Usuario",
      required: false,
      disabled: true,
    },
    {
      type: "text",
      name: "name",
      label: "Nombre",
      required: true,
      disabled: false,
    },
    {
      type: "file",
      name: "file",
      label: "Cargar",
      required: true,
      disabled: false,
    }
  ]
  useEffect(() => {
    setValue("date", new Date().toISOString().split("T")[0])
    setValue("user", "Juan Perez")
  }
  , [])
  const onSubmit = (data) => {
    console.log(data)
  }
  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name)
  }

  console.log(errors)
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div></div>
          <h3>Importar Datos</h3>
          <button onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
          {
            inputs.map((input, index) => (
              <div className={styles.formGroup} key={`${input.name}${index}`}>
                <div className={styles.inputGroup}>
                  <label htmlFor={input.name}>{input.label}</label>
                  {
                    input.type === "file" ?
                    <>
                      <input hidden type={input.type} {...register(input.name, {required: {value:input.required, message: input.label}, onChange:(e) => onChangeFile(e)})} id={input.name} />
                      <label className={styles.btnFile} htmlFor={input.name}>Adjuntar</label>
                      <p>{fileName}</p>
                    </>
                    :
                    <input type={input.type} {...register(input.name, {required: {value:input.required, message: input.label}})} disabled={input.disabled} />
                  }
                </div>
                {errors[input.name] && <span className={styles.error}>{`El campo ${errors[input.name].message} es requerido`}</span>}

              </div>
            ))
          }
          <button type="submit"><BiSave/> Guardar </button>
        </form>
      </div>
    </div>
  )
}
