import { useForm } from "react-hook-form";
import styles from "./customTextArea.module.scss";
export const CustomTextArea = () => {
  
  const { register, setValue, watch, formState:{errors} } = useForm();
  const maxLength = 319;
  const message = watch('message');

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value)
    if(value.length <= maxLength){
      setValue('message', value);
    }
    else{
      setValue('message', value.slice(0, maxLength));
    }
    setValue('message', value);
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ingresa el texto</h3>
      <textarea
        className={styles.textArea}
        {...register('message', { required: true })}
        onChange={handleChange}

      />
      <p>{`${message?.length == undefined ? 0 : message.length } / ${maxLength}`}</p>
    </div>
  )
}
