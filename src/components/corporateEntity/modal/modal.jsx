import { BiSave } from 'react-icons/bi'
import styles from './modal.module.scss'
import { ModalContext } from '@/contexts/modalContext';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCorporateImage, updateCorporateImage } from '@/services/corporateImage.service';
import { LoadingContext } from '@/contexts/LoadingContext';

export const ModalCorporateEntity = () => {
  const {closeModal, refetch, setRefetch, dataTable} = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [previewImg, setPreviewImg] = useState(null)
  const [file, setFile] = useState(null)
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [secondaryColor, setSecondaryColor] = useState("#000000")


  useEffect(() => {
    const formData = new FormData()
    formData.append("name", dataTable.logo)
    console.log(dataTable)
    if(Object.keys(dataTable).length > 0){
      setValue("name", dataTable.name)
      setValue("user", dataTable.user)
      setValue("logo", formData)
      setValue("primaryColor", dataTable.main_color)
      setValue("secondaryColor", dataTable.secondary_color)
      setPreviewImg(`${import.meta.env.VITE_URL_FILE}${dataTable.logo}`)
      setPrimaryColor(dataTable.main_color)
      setSecondaryColor(dataTable.secondary_color)
    }}, [dataTable])

  const handleClose = () => {
    closeModal()
  }
  const onSubmit = (data) => {
    setLoading(true)
    if(Object.keys(dataTable).length > 0){
      handleEdit(data)
    } else {
      handleCreate(data)
    }
  }
  
  const handleCreate = (data) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("user", data.user)
    formData.append("logo", file)
    formData.append("main_color", primaryColor)
    formData.append("secondary_color", secondaryColor)
    createCorporateImage(formData).then(() => {
      setRefetch(!refetch)
      closeModal()
    }).catch((error) => {
      console.log(error)
    }).finally(() => setLoading(false))
  }
  const handleEdit = (data) => {
    const formDataEdit = new FormData()
    if(data.name !== dataTable.name) formDataEdit.append("name", data.name)
    if(data.user !== dataTable.user) formDataEdit.append("user", data.user)
    if(primaryColor !== dataTable.main_color) formDataEdit.append("main_color", primaryColor)
    if(secondaryColor !== dataTable.secondary_color) formDataEdit.append("secondary_color", secondaryColor)
    if(file) formDataEdit.append("logo", file)
    const dataEdit = Object.fromEntries(formDataEdit)
    if(Object.keys(dataEdit).length === 0) {
      closeModal()
      setLoading(false)
      return
    }
    updateCorporateImage(dataTable.UUID, formDataEdit).then(() => {
      setRefetch(!refetch)
      closeModal()
    }).catch((error) => {
      console.log(error)
    }).finally(() => setLoading(false))
  }





  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    setFile(file)
    reader.onload = () => {
      if(reader.readyState === 2){
        setPreviewImg(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Nombre",
      required: true,
    },
    {
      type: "text",
      name: "user",
      label: "Usuario",
      required: true,
    },
    {
      type: "file",
      name: "logo",
      label: "Logo",
      required: previewImg ? false : true,
    },
    {
      type: "color",
      name: "primaryColor",
      label: "Color Principal",
      required: true,
    },
    {
      type: "color",
      name: "secondaryColor",
      label: "Color Secundario",
      required: true,
    }
  ]

  const handleColor = (e) => {
    if(e.target.name === "primaryColor"){
      setPrimaryColor(e.target.value)
    } else {
      setSecondaryColor(e.target.value)
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div></div>
          <h3>Identidades Corporativas</h3>
          <button onClick={handleClose}>X</button>
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
                      <input type={input.type} {...register(input.name, {required: { value: input.required, message: input.label}, onChange:(e) => handleChangeFile(e)})} accept='image/png, image/jpeg'  />
                      {previewImg&&<img src={previewImg} alt="preview" />}
                    </>
                    : input.type === "color" ?
                    <>
                      <input  type={input.type} {...register(input.name, {required: { value: input.required, message: input.label}, onChange:(e) => handleColor(e)} )}/>
                      <p>{input.name == "primaryColor" ? primaryColor : secondaryColor}</p>
                    </>
                    : <input type={input.type} {...register(input.name, {required: { value: input.required, message: input.label}})}/>
                  }
                </div>
                {errors[input.name] && <span className={styles.error}>{`El campo ${errors[input.name].message} es requerido`}</span>}
              </div>
            ))
          }
            <button className={styles.save}><BiSave/> Guardar</button>
          </form>
      </div>
    </div>
  )
}
