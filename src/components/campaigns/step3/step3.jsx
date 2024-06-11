
import { RiArrowGoBackFill } from 'react-icons/ri'
import styles from './step3.module.scss'
import { MdArrowForwardIos } from 'react-icons/md'

export const Step3 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
}) => {
  const inputsRadio = [
    {
      name: 'typeCampaignStep3',
      type: 'radio',
      options: ['E-mail', 'SMS','Llamada', 'WhatsApp']
    }
  ]

  const onChangeTypeCampaign = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <div className={styles.containerCampaignType}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {inputsRadio.map((input, index) => {
            return (
              <div key={`${index}_${input.name}`} className={styles.formGroup}>
                {input.type === 'radio' && (
                  <div className={styles.containerRadio}>
                    {input.options.map((option, index) => (
                      <div key={`${index}_${option}`} className={styles.radio}>
                        <input
                          {...register(input.name, { required: true })}
                          type="radio"
                          value={option}
                          onChange={onChangeTypeCampaign}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                {errors[input.name] && (
                  <span className={styles.error}>{`El campo ${
                    errors[input.name].message
                  } es requerido`}</span>
                )}
              </div>
            )
          })}
          <div className={styles.containerBtn}>
            <button className={styles.button} onClick={handleBack}>
              <RiArrowGoBackFill /> Atrás
            </button>
            <button className={styles.button}>
              <MdArrowForwardIos />
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
