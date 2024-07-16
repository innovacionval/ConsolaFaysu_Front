import { useForm } from "react-hook-form";
import styles from "./campaigns.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useState } from "react";
import { Table } from "@/components/table/table";
import { FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { Step2 } from "@/components/campaigns/step2/step2";
import { Step3 } from "@/components/campaigns/step3/step3";
import { RiArrowGoBackFill } from "react-icons/ri";

export const Campaigns = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm();
  const [dataCampaign, setDataCampaign] = useState([]);
  const [steps, setSteps] = useState(3);
  const onSubmit = (data) => {
    setDataCampaign([...dataCampaign, data]);
    setSteps(1);
  };
  const onSubmitStep2 = (data) => {
    console.log(data);
    setDataCampaign([...dataCampaign, data]);
    setSteps(2);
  };
  const onSubmitStep3 = (data) => {
    /* setValue("message", getValues("message") + " " + data.message); */
    console.log(data);
/*     setDataCampaign([...dataCampaign, data]);
    setSteps(3); */
  };
  const handleBackStep1 = () => {
    setSteps(0);
  };
  const handleBackStep2 = () => {
    setSteps(1);
  };
  const inputs = [
    {
      label: "Fuente",
      name: "source",
      type: "select",
    },
    {
      label: "Empresa",
      name: "company",
      type: "select",
    },
    {
      label: "Cliente",
      name: "client",
      type: "select",
    },
    {
      label: "Estado de obligación",
      name: "obligationState",
      type: "select",
    },
    {
      label: "Clasificación",
      name: "classification",
      type: "select",
    },
    {
      label: "Saldos",
      name: "balances",
      type: "select",
      placeholder: "Mora menor a",
    },
    {
      label: "Días de mora",
      name: "daysOfDelay",
      type: "select",
      placeholder: "Mayor a",
    },
    {
      label: "Tipo de gestión",
      name: "managementType",
      type: "select",
    },
  ];
  const labels = [
    "Nombre",
    "Notificador",
    "Medio",
    "Vigencia",
    "Estado",
    "Acción",
  ];

  const actions = [
    {
      name: "switch",
      action: (id) => {
        const item = dataCampaign.find((item) => item.id === id);
        item.status = item.status === "Vigente" ? "Terminada" : "Vigente";
        setDataCampaign([...dataCampaign]);
      },
    },
    {
      name: "edit",
      icon: <FaEdit />,
      action: (id) => {
        console.log(id);
      },
    },
  ];
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const dataTable = [
    {
      name: "Campaña 1",
      notifier: "Si",
      media: "Correo",
      validity: "10/10/2021",
      status: "Vigente",
    },
    {
      name: "Campaña 2",
      notifier: "No",
      media: "WhatsApp",
      validity: "10/10/2021",
      status: "Terminada",
    }
  ]

  return (
    <div className={styles.container}>
      <h2>{steps == 2 ? "Tipo de campaña" : "Campaña"}</h2>
      {steps == 0 && (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {inputs.map((input, index) => {
            if (input.name == "daysOfDelay" || input.name == "balances") {
              return (
                <div
                  key={`${input.name}_${index}`}
                  className={styles.formGroup}
                >
                  <label htmlFor={input.name}>{input.label}</label>
                  <select {...register(input.name)}>
                    <option value="">{input.placeholder}</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Número de días"
                    {...register(`${input.name}numDays`)}
                  />
                  {errors[input.name] && (
                    <span className={styles.error}>{`El campo ${
                      errors[input.name].message
                    } es requerido`}</span>
                  )}
                </div>
              );
            }
            return (
              <div key={`${input.name}${index}`} className={styles.formGroup}>
                <label htmlFor={input.name}>{input.label}</label>
                <select {...register(input.name)}>
                  <option disabled value="">
                    {input.label}
                  </option>
                </select>
                {errors[input.name] && (
                  <span className={styles.error}>{`El campo ${
                    errors[input.name].message
                  } es requerido`}</span>
                )}
              </div>
            );
          })}
          <div className={styles.containerBtn}>
          <button onClick={() => setSteps(3)} className={styles.button}>
            <RiArrowGoBackFill /> Atrás
          </button>
            <button className={styles.button}>
              <MdArrowForwardIos /> Siguiente
            </button>
          </div>
        </form>
      )}
      {steps == 1 && (
        <Step2
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmitStep2}
          handleBack={handleBackStep1}
        />
      )}
      {steps == 2 && (
        <Step3
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmitStep3}
          setValue={setValue}
          handleBack={handleBackStep2}
          getValues={getValues}
          watch={watch}
        />
      )}

      {steps == 3 && <>
        <div className={styles.containerHeader}>
          <form className={styles.containerInput}>
            <input
              type="text"
              placeholder="Buscar"
              name="search"
              value={search}
              onChange={handleChange}
            />
            <button>
              <FaSearch />
            </button>
          </form>
          <button onClick={() => setSteps(0)} className={styles.button}>
            <FaPlus />
            Nuevo
          </button>
        </div>
        <Table labels={labels} data={dataTable} actions={actions} />
        </>}
    </div>
  );
};
