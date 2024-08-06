import { MdArrowForwardIos } from "react-icons/md";
import styles from "./step2.module.scss";
import { RiArrowGoBackFill } from "react-icons/ri";

export const Step2 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
  watch,
  daysPeriodicity,
  setDaysPeriodicity,
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
      label: "Repetir cada",
    },
    {
      label: "Vigencia de campaña",
      name: "validity",
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
  ];

  const watchPeriodicity = watch("periodicity");

  const handleDays = (day) => {
    setDaysPeriodicity({
      ...daysPeriodicity,
      [day]: !daysPeriodicity[day],
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {inputs.map((input, index) => {
          return (
            <div key={`${index}_${input.name}`} className={styles.formGroup}>
              <label>{input.label}</label>
              {input.type === "text" && (
                <input
                  {...register(input.name /* { required: true } */)}
                  type="text"
                />
              )}
              {input.type === "date" && (
                <input
                  {...register(input.name /* { required: true } */)}
                  type="date"
                />
              )}
              {input.label === "Repetir cada" && (
                <div className={styles.containerPeriodicity}>
                  <div className={styles.periodicity}>
                    <input className={styles.inputMonth} {...register("periodicityNumber")} type="number" />
                    <select {...register("periodicity")}>
                      <option value="">Seleccionar</option>
                      <option value="Día">Día</option>
                      <option value="Semana">Semana</option>
                      <option value="Mes">Mes</option>
                      <option value="Año">Año</option>
                    </select>
                  </div>
                  {watchPeriodicity === "Semana" && (
                    <div className={styles.days}>
                      <button
                        className={
                          daysPeriodicity.sunday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("sunday");
                        }}
                      >
                        D
                      </button>
                      <button
                        className={
                          daysPeriodicity.monday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("monday");
                        }}
                      >
                        L
                      </button>
                      <button
                        className={
                          daysPeriodicity.tuesday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("tuesday");
                        }}
                      >
                        M
                      </button>
                      <button
                        className={
                          daysPeriodicity.wednesday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("wednesday");
                        }}
                      >
                        X
                      </button>
                      <button
                        className={
                          daysPeriodicity.thursday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("thursday");
                        }}
                      >
                        J
                      </button>
                      <button
                        className={
                          daysPeriodicity.friday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("friday");
                        }}
                      >
                        V
                      </button>
                      <button
                        className={
                          daysPeriodicity.saturday ? styles.active : null
                        }
                        type="button"
                        onClick={() => {
                          handleDays("saturday");
                        }}
                      >
                        S
                      </button>
                    </div>
                  )}
                  {watchPeriodicity === "Mes" && (
                    <div>
                      El día{" "}
                      <input
                        className={styles.inputMonth}
                        {...register("periodicityNumberMonth")}
                        type="number"
                      />
                    </div>
                  )}
                  {watchPeriodicity === "Año" && (
                    <div>
                      El día{" "}
                      <input
                        className={styles.inputMonth}
                        {...register("periodicityNumberYear")}
                        type="number"
                      />{" "}
                      de{" "}
                      <select {...register("periodicityMonth")}>
                        <option value="">Seleccionar</option>
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                      </select>
                    </div>
        )}
                </div>
              )}
              {input.type === "radio" && (
                <div className={styles.radioGroup}>
                  {input.options.map((option, index) => {
                    return (
                      <div key={index} className={styles.radio}>
                        <input
                          {...register(input.name /* { required: true } */)}
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
                  {...register(input.name /* { required: true } */)}
                  name={input.name}
                >
                  <option value="">Seleccionar</option>
                </select>
              )}
              {errors[input.name] && (
                <span className={styles.error}>{`El campo ${
                  errors[input.name].message
                } es requerido`}</span>
              )}
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
