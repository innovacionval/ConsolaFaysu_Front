import { useForm } from 'react-hook-form'
import styles from './modal.module.scss'
import { ModalContext } from '@/contexts/modalContext';
import { useContext, useEffect } from 'react';
import { BiSave } from 'react-icons/bi';
import { createSenderEmail } from '@/services/senderEmail.service';
import { LoadingContext } from '@/contexts/LoadingContext';

export const ModalSender = () => {

  const {closeModal, refetch, dataTable, setRefetch} = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();

  useEffect(() => {
    if (Object.keys(dataTable).length > 0) {
      setValue("sender_email", dataTable.sender_email)
      setValue("phone", dataTable.phone)
      setValue("description", dataTable.description)
    }
  }, [dataTable]);


  const inputs = [
    {
      type: "email",
      name: "sender_email",
      label: "Email",
      required: true,
    },
    {
      type: "number",
      name: "phone",
      label: "Celular",
      required: true,
    },
    {
      type: "text",
      name: "description",
      label: "Descripción",
      required: true,
    },
  ]

  const handleClose = () => {
    closeModal()
  }

  const handleForm = (data) => {
    setLoading(true)
    const fixData = {
      ...data,
      status: true
    }
    console.log(fixData)
    createSenderEmail(fixData).then((response) => {
      setRefetch(!refetch);
      closeModal();
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div></div>
          <h3>Remitente</h3>
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
                            <option key={index} value={option.value}>{option.label}</option>
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
                      <input key={index} type={input.type} {...register(input.name, {required: { value: input.required, message: input.label}})} disabled={input.disabled}/>
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
