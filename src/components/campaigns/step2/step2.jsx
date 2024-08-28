import { MdArrowForwardIos } from "react-icons/md";
import styles from "./step2.module.scss";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getAllCorporateImages } from "@/services/corporateImage.service";
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
}) => {
  const [corporateData, setCorporateData] = useState([]);
  useEffect(() => {
    getAllCorporateImages().then((response) => {
      setCorporateData(response.data);
    });
  }, []);
  const inputs = inputsStep2(corporateData);

  const watchPeriodicity = watch("repetition_type");

  const handleDays = (day) => {
    setDaysPeriodicity({
      ...daysPeriodicity,
      [day]: !daysPeriodicity[day],
    });
  };

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
                            daysPeriodicity.sunday ? styles.active : null
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
                            daysPeriodicity.monday ? styles.active : null
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
                            daysPeriodicity.tuesday ? styles.active : null
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
                            daysPeriodicity.wednesday ? styles.active : null
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
                            daysPeriodicity.thursday ? styles.active : null
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
                            daysPeriodicity.friday ? styles.active : null
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
                            daysPeriodicity.saturday ? styles.active : null
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
                    {watchPeriodicity === "month" && (
                      <div className={styles.days}>
                        <label>El día</label>
                        <input
                          className={styles.inputMonth}
                          {...register("periodicityNumberMonth")}
                          type="number"
                        />
                      </div>
                    )}
                    {watchPeriodicity === "year" && (
                      <div className={styles.containerYear}>
                        <div className={styles.days}>
                          <label>El día</label>
                          <input
                            className={styles.inputMonth}
                            {...register("periodicityNumberYear")}
                            type="number"
                          />
                        </div>
                        <div className={styles.days}>
                          <label>de</label>
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
                    {...register(input.name /* { required: true } */)}
                    name={input.name}
                  >
                    <option value="">Seleccionar</option>
                    {input?.options?.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                )}
                {input.type == "time" && (
                  <input
                    {...register(input.name /* { required: true } */)}
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
