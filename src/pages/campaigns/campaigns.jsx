import { set, useForm } from "react-hook-form";
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
import {
  getAllSourceFiles,
  getSourceFileById,
} from "@/services/sourceFile.service";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
} from "@/services/campaign.service";
import { inputsCampaign, labelsCampaign } from "@/utils/inputs";
import { getAllSenderEmails } from "@/services/senderEmail.service";
import { ModalContext } from "@/contexts/modalContext";
import { getAllCorporateImages } from "@/services/corporateImage.service";

export const Campaigns = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset
  } = useForm();
  const [dataCampaign, setDataCampaign] = useState([]);
  const [valueMessage, setValueMessage] = useState("");
  const { setRefetch, refetch } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);
  const [optionsClient, setOptionsClient] = useState([]);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [steps, setSteps] = useState(3);
  const [importData, setImportData] = useState([]);
  const [dataForm, setDataForm] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const watchSource = watch("source2");
  const watchImport = watch("source");

  const [corporateData, setCorporateData] = useState([]);
  useEffect(() => {
    setValue("campaign_type", "correo");
    getAllCorporateImages().then((response) => {
      setCorporateData(response.data);
    });
    getAllSenderEmails().then((response) => {
      setUsersData(
        response.data
          .filter((item) => item.status)
          .map((user) => {
            return {
              id: user.id,
              email: user.sender_email,
              phone: user.phone,
            };
          })
      );
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getAllCampaigns()
      .then((response) => {
        console.log("response", response);
        response.data.map((item) => {
          item.id = item.UUID;
          item.end_date = new Date(item.end_date).toLocaleDateString();
          item.start_date = new Date(item.start_date).toLocaleDateString();
        });
        setDataCampaign(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));

    getAllSourceFiles().then((response) => {
      setImportData(response.data);
    });

    getAllSenderEmails()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refetch]);

  useEffect(() => {
    if (!watchImport) return;
    getSourceFileById(watchImport).then((response) => {
      setClients(response.data.customers);
    });
  }, [watchImport]);

  const [daysPeriodicity, setDaysPeriodicity] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const onSubmit = (data) => {
    setDataForm([...dataCampaign, data]);
    setSteps(1);
  };
  const onSubmitStep2 = (data) => {
    setDataForm([...dataCampaign, data]);
    setSteps(2);
  };
  const onSubmitStep3 = (data) => {
    setLoading(true);
    setDataCampaign([...dataCampaign, data]);
    let fixData = {};
    switch (data.repetition_type) {
      case "week":
        fixData = {
          source: data.source,
          account_balance_type: data.account_balance_type,
          account_balance_value: data.account_balance_value,
          days_past_due_type: data.days_past_due_type,
          days_past_due_value: data.days_past_due_value,
          name_campaign: data.name_campaign,
          notify_the_co_debtor: data.notify_the_co_debtor,
          start_date: new Date(data.start_date).toISOString(),
          end_date: new Date(data.end_date).toISOString(),
          is_recurring: true,
          repetition_type: data.repetition_type,
          interval: data.interval,
          end_recurrence: data.end_date,
          send_time: data.send_time,
          corporate_identity: data.corporate_identity,
          campaign_type: data.campaign_type,
          message_body: data.sender + "" + data.subject + "" + data.message_body,
          active: true,
          week_days: Object.keys(daysPeriodicity).filter(
            (day) => daysPeriodicity[day]
          ),
        };
        break;
      case "year":
        fixData = {
          source: data.source,
          account_balance_type: data.account_balance_type,
          account_balance_value: data.account_balance_value,
          days_past_due_type: data.days_past_due_type,
          days_past_due_value: data.days_past_due_value,
          name_campaign: data.name_campaign,
          notify_the_co_debtor: data.notify_the_co_debtor,
          start_date: new Date(data.start_date).toISOString(),
          end_date: new Date(data.end_date).toISOString(),
          is_recurring: true,
          repetition_type: data.repetition_type,
          interval: data.interval,
          end_recurrence: data.end_date,
          send_time: data.send_time,
          corporate_identity: data.corporate_identity,
          campaign_type: data.campaign_type,
          message_body: data.sender + "" + data.subject + "" + data.message_body,
          active: true,
          month: data.periodicityMonth,
        };
        break;
      default:
        fixData = {
          source: data.source,
          account_balance_type: data.account_balance_type,
          account_balance_value: data.account_balance_value,
          days_past_due_type: data.days_past_due_type,
          days_past_due_value: data.days_past_due_value,
          name_campaign: data.name_campaign,
          notify_the_co_debtor: data.notify_the_co_debtor,
          start_date: new Date(data.start_date).toISOString(),
          end_date: new Date(data.end_date).toISOString(),
          is_recurring: true,
          repetition_type: data.repetition_type,
          interval: data.interval,
          end_recurrence: data.end_date,
          send_time: data.send_time,
          corporate_identity: data.corporate_identity,
          campaign_type: data.campaign_type,
          message_body: data.sender + "" + data.subject + "" + data.message_body,
          active: true,
        };
    }
    if(isEdit) {
      updateCampaign(idEdit, fixData)
      .then((response) => {
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setSteps(3);
      });
      return;
    }
    createCampaign(fixData)
      .then((response) => {
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setSteps(3);
      });
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
        item.active = !item.active;
        updateCampaign(item.id, { active: item.active })
          .then((response) => {
            setRefetch(!refetch);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    {
      name: "edit",
      icon: <FaEdit />,
      action: (id) => {
        setLoading(true);
        setIsEdit(true);
        setIdEdit(id);
        getCampaignById(id)
          .then((response) => {
            Object.entries(response.data).map(([key, value]) => {
              if (key == "start_date" || key == "end_date") {
                value = new Date(value).toISOString().split("T")[0];
              }
              if (key == "notify_the_co_debtor") {
                value = value ? "true" : "false";
              }
              /* if(key == "corporate_identity") {
              console.log(value)
              value = value.UUID;
            } */
              if (key == "message_body") {
                setValue("message_body", value);
                setValueMessage(value);
              }
              setValue(key, value);
            });
            console.log(getValues());
            setValue("source2", "importador");
            setSteps(0);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
    },
  ];
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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

  const handleNewCampaign = () => {
    setSteps(0);
    reset();
    setIsEdit(false);
    setIdEdit(null);
  }


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
                if (
                  input.name == "days_past_due_type" ||
                  input.name == "account_balance_type"
                ) {
                  return (
                    <div
                      key={`${input.name}_${index}`}
                      className={styles.formGroup}
                    >
                      <label htmlFor={input.name}>{input.label}</label>
                      <div className={styles.containerInputs}>
                        <select
                          {...register(input.name, {
                            required: {
                              value: true,
                              message: `${input.label}`,
                            },
                          })}
                        >
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
                          placeholder={
                            input.name == "days_past_due_type"
                              ? "Número de días"
                              : "Valor"
                          }
                          {...register(
                            input.name == "account_balance_type"
                              ? `account_balance_value`
                              : "days_past_due_value",
                            {
                              required: {
                                value: true,
                                message: `${input.label}`,
                              },
                            }
                          )}
                        />
                      </div>
                      {errors[input.name] && (
                        <span className={styles.error}>{`El campo ${
                          errors[input.name].message
                        } es requerido`}</span>
                      )}
                      {errors[
                        input.name == "account_balance_type"
                          ? `account_balance_value`
                          : "days_past_due_value"
                      ] && (
                        <span className={styles.error}>{`El campo ${
                          errors[
                            input.name == "account_balance_type"
                              ? `account_balance_value`
                              : "days_past_due_value"
                          ].message
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
                      <select
                        {...register(input.name, {
                          required: { value: true, message: `${input.label}` },
                        })}
                      >
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
          corporateData={corporateData}
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
          usersData={usersData}
          valueMessage={valueMessage}
          setValueMessage={setValueMessage}
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
            <button onClick={handleNewCampaign} className={styles.button}>
              <FaPlus />
              Nuevo
            </button>
          </div>
          <Table
            labels={labelsCampaign}
            data={dataCampaign}
            actions={actions}
          />
        </>
      )}
    </div>
  );
};
