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
import { getAllCampaigns } from "@/services/campaign.service";
import { inputsCampaign, labelsCampaign } from "@/utils/inputs";
import { getAllSenderEmails } from "@/services/senderEmail.service";

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
  const [dataForm, setDataForm] = useState({});
  const watchSource = watch("source2");

  useEffect(() => {
    setLoading(true);
    getAllCampaigns().then((response) => {
      console.log('response', response)
      setDataCampaign(response.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => setLoading(false));

    getAllSourceFiles().then((response) => {
      setImportData(response.data);
    });

    getAllSenderEmails().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
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
    setDataForm([...dataCampaign, data]);
    setSteps(1);
  };
  const onSubmitStep2 = (data) => {
    console.log(data);
    setDataForm([...dataCampaign, data]);
    setSteps(2);
  };
  const onSubmitStep3 = (data) => {
    /* setValue("message", getValues("message") + " " + data.message); */
    setDataCampaign([...dataCampaign, data]);
    console.log(data);
    /* createCampaign(data).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }); */
  };
  const handleBackStep1 = () => {
    setSteps(0);
  };
  const handleBackStep2 = () => {
    setSteps(1);
  };
  const inputs = inputsCampaign(watchSource, importData);
  

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

  console.log(dataForm)

/*   const dataTable = [
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
  ]; */

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
                if (input.name == "days_past_due_type" || input.name == "account_balance_type") {
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
                          placeholder={input.name == "days_past_due_type" ? "Número de días" : "Valor"}
                          {...register(input.name == "account_balance_type" ? `account_balance_value` : "days_past_due_value")}
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
                  input?.isVisibility && (
                  <div
                    key={`${input.name}${index}`}
                    className={styles.formGroup}
                  >
                    <label htmlFor={input.name}>{input.label}</label>
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
                    {errors[input.name] && (
                      <span className={styles.error}>{`El campo ${
                        errors[input.name].message
                      } es requerido`}</span>
                    )}
                  </div>
                  )
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
          <Table labels={labelsCampaign} data={dataCampaign} actions={actions} />
        </>
      )}
    </div>
  );
};
