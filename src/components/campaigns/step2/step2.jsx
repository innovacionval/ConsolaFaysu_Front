import { MdArrowForwardIos } from "react-icons/md";
import styles from "./step2.module.scss";
import { RiArrowGoBackFill } from "react-icons/ri";

export const Step2 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
}) => {
  const inputs = [
    {
      label: "Nombre de campaña",
      name: "campaignName",
      type: "text",
    },
    {
      label: "Notificar a deudor solidario",
      name: "notifier",
      type: "radio",
      options: ["Si", "No"],
    },
    {
      label: "Fecha de notificación",
      name: "notificationDate",
      type: "date",
    },
    {
      label: "Horario de envío",
      name: "schedule",
      type: "select",
    },
    {
      label: "Seleccionar identidad corporativa",
      name: "corporateEntity",
      type: "select",
    },
    {
      label: "Seleccionar correo/Wa remitente",
      name: "sender",
      type: "select",
    },
    {
      label: "Vigencia de campaña",
      name: "validity",
      type: "date",
    },
  ];
  return (
    <>
    <h2>Paso 2</h2>
    
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {inputs.map((input, index) => {
          return (
              <div key={`${index}_${input.name}`} className={styles.formGroup}>
                <label>{input.label}</label>
                {input.type === "text" && (
                  <input
                    {...register(input.name, /* { required: true } */)}
                    type="text"
                  />
                )}
                {input.type === "date" && (
                  <input
                    {...register(input.name, /* { required: true } */)}
                    type="date"
                  />
                )}
                {input.type === "radio" && (
                  <div className={styles.radioGroup}>
                    {input.options.map((option, index) => {
                      return (
                        <div key={index} className={styles.radio}>
                          <input
                            {...register(input.name, /* { required: true } */)}
                            type="radio"
                            value={option}
                          />
                          <label>{option}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
                {input.type === "select" && (
                  <select
                    {...register(input.name, /* { required: true } */)}
                    name={input.name}
                  >
                    <option value="">Seleccionar</option>
                  </select>
                )}
                {errors[input.name] && <span className={styles.error}>{`El campo ${errors[input.name].message} es requerido`}</span>}
              </div>
          );
        })}
        <div className={styles.containerBtn}>
          <button onClick={handleBack} className={styles.button}>
            <RiArrowGoBackFill /> Atrás
          </button>
          <button className={styles.button}>
            <MdArrowForwardIos /> Siguiente
          </button>
        </div>
      </form>
      </>
  );
};
