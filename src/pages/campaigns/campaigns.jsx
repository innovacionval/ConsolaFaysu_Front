import { useForm } from "react-hook-form";
import styles from "./campaigns.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { Table } from "@/components/table/table";
import { FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { Step2 } from "@/components/campaigns/step2/step2";
import { Step3 } from "@/components/campaigns/step3/step3";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MultipleSelect } from "@/components/shared/multipleSelect/MultipleSelect";
import { getAllCustomersTotal } from "@/services/customers.service";
import { LoadingContext } from "@/contexts/LoadingContext";
import { getAllSourceFiles } from "@/services/sourceFile.service";

export const Campaigns = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm();
  const [dataCampaign, setDataCampaign] = useState([
    {
      id: 1,
      name: "Campaña 1",
      notifier: "Si",
      media: "Correo",
      validity: "10/10/2021",
      status: "Vigente",
    },
    {
      id: 2,
      name: "Campaña 2",
      notifier: "No",
      media: "WhatsApp",
      validity: "10/10/2021",
      status: "Terminada",
    },
  ]);
  const { setLoading } = useContext(LoadingContext);
  const [optionsClient, setOptionsClient] = useState([]);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [steps, setSteps] = useState(3);
  const [importData, setImportData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllSourceFiles().then((response) => {
      setImportData(response.data);
    });
  }, []);

  const [daysPeriodicity, setDaysPeriodicity] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

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
      label: "Empresa/importador",
      name: "company",
      type: "select",
      options: importData.map((item) => {
        return {
          value: item.UUID,
          label: item.name,
        };
      }),
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
      options: [
        {
          value: "greater",
          label: "Mayor a",
        },
        {
          value: "less",
          label: "Menor a",
        },
        {
          value: "equal",
          label: "Igual a",
        },
      ]
    },
    {
      label: "Días de mora",
      name: "daysOfDelay",
      type: "select",
      placeholder: "Mayor a",
      options: [
        {
          value: "greater",
          label: "Mayor a",
        },
        {
          value: "less",
          label: "Menor a",
        },
        {
          value: "equal",
          label: "Igual a",
        },
      ]
    },
    {
      label: "Tipo de gestión",
      name: "managementType",
      type: "select",
    },
  ];
  const labels = [
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "notifier",
      label: "Notificador",
    },
    {
      name: "media",
      label: "Medio",
    },
    {
      name: "validity",
      label: "Vigencia",
    },
    {
      name: "status",
      label: "Estado",
    },
    {
      name: "",
      label: "",
    },
  ];

  const actions = [
    {
      name: "switch",
      action: (id) => {
        const item = dataCampaign.find((item) => item.id === id);
        console.log(item);
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
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const dataTable = [
    {
      id: 1,
      name: "Campaña 1",
      notifier: "Si",
      media: "Correo",
      validity: "10/10/2021",
      status: "Vigente",
    },
    {
      id: 2,
      name: "Campaña 2",
      notifier: "No",
      media: "WhatsApp",
      validity: "10/10/2021",
      status: "Terminada",
    },
  ];

  useEffect(() => {
    setDataCampaign([...dataTable]);
  }, [steps]);

  useEffect(() => {
    setLoading(true);
    getAllCustomersTotal()
      .then((response) => {
        setOptionsClient(
          response.data.map((item) => {
            return {
              value: item.UUID,
              label: item.name,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h2>{steps == 2 ? "Tipo de campaña" : "Campaña"}</h2>
        {steps == 0 && <h2>Paso 1</h2>}
        {steps == 1 && <h2>Paso 2</h2>}
        {steps == 2 && <h2>Paso 3</h2>}
      </div>
      {steps == 0 && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGrid}>
              {inputs.map((input, index) => {
                if (input.name == "client") {
                  return (
                    <div
                      key={`${input.name}${index}`}
                      className={styles.formGroupClient}
                    >
                      <label className={styles.labelTitle} htmlFor={input.name}>
                        {input.label}
                      </label>
                      <MultipleSelect
                        campaign={true}
                        clients={clients}
                        setClients={setClients}
                        data={optionsClient}
                      />
                    </div>
                  );
                }
                if (input.name == "daysOfDelay" || input.name == "balances") {
                  return (
                    <div
                      key={`${input.name}_${index}`}
                      className={styles.formGroup}
                    >
                      <label htmlFor={input.name}>{input.label}</label>
                      <div className={styles.containerInputs}>
                        <select {...register(input.name)}>
                          <option value="" disabled>
                            {input.label}
                          </option>
                          {input?.options?.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder={input.name == "daysOfDelay" ? "Número de días" : "Valor"}
                          {...register(`${input.name}numDays`)}
                        />
                      </div>
                      {errors[input.name] && (
                        <span className={styles.error}>{`El campo ${
                          errors[input.name].message
                        } es requerido`}</span>
                      )}
                    </div>
                  );
                }
                return (
                  <div
                    key={`${input.name}${index}`}
                    className={styles.formGroup}
                  >
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
            </div>
            <div className={styles.containerBtn}>
              <button onClick={() => setSteps(3)} className={styles.button}>
                <RiArrowGoBackFill /> Atrás
              </button>
              <button className={styles.button}>
                <MdArrowForwardIos /> Siguiente
              </button>
            </div>
          </form>
        </>
      )}
      {steps == 1 && (
        <Step2
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmitStep2}
          handleBack={handleBackStep1}
          watch={watch}
          daysPeriodicity={daysPeriodicity}
          setDaysPeriodicity={setDaysPeriodicity}
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

      {steps == 3 && (
        <>
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
          <Table labels={labels} data={dataCampaign} actions={actions} />
        </>
      )}
    </div>
  );
};
