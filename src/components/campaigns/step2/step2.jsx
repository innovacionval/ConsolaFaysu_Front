import { MdArrowForwardIos } from "react-icons/md";
import styles from "./step2.module.scss";
import { RiArrowGoBackFill } from "react-icons/ri";
import { inputsStep2 } from "@/utils/inputs";

export const Step2 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
  watch,
  daysPeriodicity,
  setDaysPeriodicity,
  corporateData
}) => {
  
  const inputs = inputsStep2(corporateData);

  const watchPeriodicity = watch("repetition_type");

  const handleDays = (day) => {
    setDaysPeriodicity({
      ...daysPeriodicity,
      [day]: !daysPeriodicity[day],
    });
  };
  const watchs = watch("corporate_identity");
  console.log(watchs)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGrid}>
          {inputs.map((input, index) => {
            return (
              <div key={`${index}_${input.name}`} className={styles.formGroup}>
                <label>{input.label}</label>
                {input.type === "text" && (
                  <input
                    {...register(input.name, {required: true})}
                    type="text"
                  />
                )}
                {input.type === "date" && (
                  <input
                    {...register(input.name, { required: true })}
                    type="date"
                  />
                )}
                {input.label === "Repetir cada" && (
                  <div className={styles.containerPeriodicity}>
                    <div className={styles.periodicity}>
                      <input
                        className={styles.inputMonth}
                        {...register("interval")}
                        type="number"
                      />
                      <select {...register("repetition_type")}>
                        <option value="">Seleccionar</option>
                        <option value="day">Día</option>
                        <option value="week">Semana</option>
                        <option value="month">Mes</option>
                        <option value="year">Año</option>
                      </select>
                    </div>
                    {watchPeriodicity === "week" && (
                      <div className={styles.containerYear}>
                        <button
                          className={
                            daysPeriodicity[7] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("7");
                          }}
                        >
                          D
                        </button>
                        <button
                          className={
                            daysPeriodicity[1] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("1");
                          }}
                        >
                          L
                        </button>
                        <button
                          className={
                            daysPeriodicity[2] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("2");
                          }}
                        >
                          M
                        </button>
                        <button
                          className={
                            daysPeriodicity[3] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("3");
                          }}
                        >
                          X
                        </button>
                        <button
                          className={
                            daysPeriodicity[4] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("4");
                          }}
                        >
                          J
                        </button>
                        <button
                          className={
                            daysPeriodicity[5] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("5");
                          }}
                        >
                          V
                        </button>
                        <button
                          className={
                            daysPeriodicity[6] ? styles.active : null
                          }
                          type="button"
                          onClick={() => {
                            handleDays("6");
                          }}
                        >
                          S
                        </button>
                      </div>
                    )}
                    {watchPeriodicity === "year" && (
                      <div className={styles.containerYear}>
                        <div className={styles.days}>
                          <label>de</label>
                          <select {...register("periodicityMonth")}>
                            <option value="">Seleccionar</option>
                            <option value="1">Enero</option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                          </select>
                        </div>
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
                            {...register(input.name, { required: true })}
                            type="radio"
                            value={option.value}
                          />
                          <label>{option.label}</label>
                        </div>
                      );
                    })}
                  </div>
                )}
                {input.type === "select" && (
                  <select
                    {...register(input.name, { required: true })}
                    name={input.name}
                  >
                    <option value="">Seleccionar</option>
                    {input?.options?.map((option, index) => {
                      return (
                        <option key={`${option}_${index}`} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                )}
                {input.type == "time" && (
                  <input
                    {...register(input.name, { required: true })}
                    type="time"
                  />
                )}
                {errors[input.name] && (
                  <span className={styles.error}>{`El campo ${
                    errors[input.name].message
                  } es requerido`}</span>
                )}
              </div>
            );
          })}
        </div>
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
