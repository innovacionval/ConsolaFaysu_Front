import { BiSave } from 'react-icons/bi'
import styles from './modal.module.scss'
import { ModalContext } from '@/contexts/modalContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

export const ModalCorporateEntity = () => {
  const {closeModal} = useContext(ModalContext);
  const {register, handleSubmit, formState:{errors}} = useForm();
  const [previewImg, setPreviewImg] = useState(null)
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [secondaryColor, setSecondaryColor] = useState("#000000")

  const handleClose = () => {
    closeModal("corporateEntity")
  }
  const onSubmit = (data) => {
    console.log(data)
  }
  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
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
      required: true,
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
                      <input type={input.type} {...register(input.name, {required: { value: input.required, message: input.label}, onChange:(e) => handleChangeFile(e)})} />
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
