import { ModalContext } from '@/contexts/modalContext';
import styles from './modal.module.scss'
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { createUser, updateUser } from '@/services/users.service';
import { LoadingContext } from '@/contexts/LoadingContext';

export const ModalUsers = () => {
  const {closeModal, refetch, setRefetch, dataTable} = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const handleClose = () => {
    closeModal()
  }
  useEffect(() => {
    if(Object.keys(dataTable).length > 0){
      setValue("name", dataTable.firstName)
      setValue("lastName", dataTable.lastName)
      setValue("identity", dataTable.identity)
      setValue("email", dataTable.email)
      setValue("role", dataTable.role)
      setValue("status", dataTable.status)
    }}, [dataTable])

  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Nombres",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Apellidos",
      required: true,
    },
    {
      type: "number",
      name: "identity",
      label: "Identificación",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      required: true,
      disabled: Object.keys(dataTable).length > 0 ? true : false
    },
    {
      type: "select",
      name: "role",
      label: "Rol",
      required: true,
      options: [{
        value: "admin",
        label: "Administrador"
      },
      {
        value: "CollectionsLeader",
        label: "lider de cobranzas"
      }
    ],
      
    }
  ]

  const handleForm = (data) => {
    setLoading(true)
    if(Object.keys(dataTable).length > 0){
      handleEdit(data)
    } else {
      handleCreate(data)
    }
  }
  const handleCreate = (data) => {
    const dataCreate = {
      firstName: data.name,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    }
    createUser(dataCreate).then((response) => {
      closeModal()
      setRefetch(!refetch)
    }).catch((error) => {
      console.log(error)
    }).finally(() => setLoading(false))
  }


  const handleEdit = (data) => {
    const dataEdit = {
    }
    if(data.name !== dataTable.firstName) dataEdit.firstName = data.name
    if(data.lastName !== dataTable.lastName) dataEdit.lastName = data.lastName
    if(data.role !== dataTable.role) dataEdit.role = data.role

    if(Object.keys(dataEdit).length === 0) return closeModal()
    updateUser(dataTable.UUID, dataEdit).then((_response) => {
      closeModal()
      setRefetch(!refetch)
    }).catch((error) => {
      console.log(error)
    }).finally(() => setLoading(false))
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
