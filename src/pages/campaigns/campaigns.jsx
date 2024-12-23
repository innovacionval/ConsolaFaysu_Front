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
import {
  getAllSenderEmails,
  getSenderEmailById,
} from "@/services/senderEmail.service";
import { ModalContext } from "@/contexts/modalContext";
import { getAllCorporateImages } from "@/services/corporateImage.service";
import { Pagination } from "@/components/shared/pagination/Pagination";

export const Campaigns = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm();
  const [dataCampaign, setDataCampaign] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [valueMessage, setValueMessage] = useState("");
  const { setRefetch, refetch } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);
  const [optionsClient, setOptionsClient] = useState([]);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [steps, setSteps] = useState(3);
  const [importData, setImportData] = useState([]);
  const [dataForm, setDataForm] = useState({});
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

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
              id: user.UUID,
              email: user.sender_email,
              phone: user.phone,
            };
          })
      );
    });
  }, [refetch]);

  useEffect(() => {
    setLoading(true);
    getAllCampaigns(page)
      .then(async (response) => {
        const updatedData = await Promise.all(
          response.data.map(async (item) => {
            item.id = item.UUID;
            item.end_date = new Date(item.end_date).toISOString().split("T")[0];
            item.start_date = new Date(item.start_date).toISOString().split("T")[0];

            // Obtener el sender de acuerdo al tipo de campaña
            if (item.campaign_type === "correo") {
              const emailResponse = await getSenderEmailById(item.sender.UUID);
              item.sender = emailResponse.data.sender_email;
            } else {
              const phoneResponse = await getSenderEmailById(item.sender.UUID);
              item.sender = phoneResponse.data.phone;
            }

            return item; // Retornar el item actualizado
          })
        );

        setDataCampaign(updatedData); // Establecer la nueva data en el estado
        setDataSearch(updatedData); // Establecer la nueva data en el estado

        setPagination(response.paging)
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page,refetch]);

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
    data.account_balance_value = data.account_balance_value.replace(/\D/g, "");
    setLoading(true);
    setDataCampaign([...dataCampaign, data]);
    const formData = new FormData();
    let fixData = {};
    switch (data.repetition_type) {
      case "week":
        /* fixData = {
          img: data.file,
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
          message_body: data.message_body,
          sender: data.sender,
          subject: data.subject,
          active: true,
          week_days: Object.keys(daysPeriodicity).filter(
            (day) => daysPeriodicity[day]
          ),
        }; */
        if (data.file && data.file instanceof File) {
          formData.append("img", data.file);
      }
          
        formData.append("source", data.source);
        formData.append("account_balance_type", data.account_balance_type);
        formData.append("account_balance_value", data.account_balance_value);
        formData.append("days_past_due_type", data.days_past_due_type);
        formData.append("days_past_due_value", data.days_past_due_value);
        formData.append("name_campaign", data.name_campaign);
        formData.append("notify_the_co_debtor", data.notify_the_co_debtor);
        formData.append("start_date", new Date(data.start_date).toISOString());
        formData.append("end_date", new Date(data.end_date).toISOString());
        formData.append("is_recurring", true);
        formData.append("repetition_type", data.repetition_type);
        formData.append("interval", data.interval);
        /* formData.append("end_recurrence", data.end_date); */
        formData.append("send_time", data.send_time);
        formData.append("corporate_identity", data.corporate_identity);
        formData.append("campaign_type", data.campaign_type);
        formData.append("message_body", data.message_body);
        formData.append("sender", data.sender);
        formData.append("subject", data.subject);
        formData.append("active", true);
        formData.append(
          "week_days",
          Object.keys(daysPeriodicity).filter((day) => daysPeriodicity[day])
        );

        break;
      case "year":
        /* fixData = {
          img: data.file,
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
          message_body: data.message_body,
          sender: data.sender,
          subject: data.subject,
          active: true,
          month: data.periodicityMonth,
        }; */
        if (data.file && data.file instanceof File) {
          formData.append("img", data.file);
      }
        formData.append("source", data.source);
        formData.append("account_balance_type", data.account_balance_type);
        formData.append("account_balance_value", data.account_balance_value);
        formData.append("days_past_due_type", data.days_past_due_type);
        formData.append("days_past_due_value", data.days_past_due_value);
        formData.append("name_campaign", data.name_campaign);
        formData.append("notify_the_co_debtor", data.notify_the_co_debtor);
        formData.append("start_date", new Date(data.start_date).toISOString());
        formData.append("end_date", new Date(data.end_date).toISOString());
        formData.append("is_recurring", true);
        formData.append("repetition_type", data.repetition_type);
        formData.append("interval", data.interval);
        /* formData.append("end_recurrence", data.end_date); */
        formData.append("send_time", data.send_time);
        formData.append("corporate_identity", data.corporate_identity);
        formData.append("campaign_type", data.campaign_type);
        formData.append("message_body", data.message_body);
        formData.append("sender", data.sender);
        formData.append("subject", data.subject);
        formData.append("active", true);
        formData.append("month", data.periodicityMonth);
        break;
      default:
        /* fixData = {
          img: data.file,
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
          message_body: data.message_body,
          sender: data.sender,
          subject: data.subject,
          active: true,
        }; */
        if (data.file && data.file instanceof File) {
          formData.append("img", data.file);
      }
        formData.append("source", data.source);
        formData.append("account_balance_type", data.account_balance_type);
        formData.append("account_balance_value", data.account_balance_value);
        formData.append("days_past_due_type", data.days_past_due_type);
        formData.append("days_past_due_value", data.days_past_due_value);
        formData.append("name_campaign", data.name_campaign);
        formData.append("notify_the_co_debtor", data.notify_the_co_debtor);
        formData.append("start_date", new Date(data.start_date).toISOString());
        formData.append("end_date", new Date(data.end_date).toISOString());
        formData.append("is_recurring", true);
        formData.append("repetition_type", data.repetition_type);
        formData.append("interval", data.interval);
        /* formData.append("end_recurrence", data.end_date); */
        formData.append("send_time", data.send_time);
        formData.append("corporate_identity", data.corporate_identity);
        formData.append("campaign_type", data.campaign_type);
        formData.append("message_body", data.message_body);
        formData.append("sender", data.sender);
        formData.append("subject", data.subject);
        formData.append("active", true);
    }
    if (isEdit) {
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
    createCampaign(formData)
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
              setValue(key, value);
            });
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
    const filtered = dataCampaign.filter((item) =>
      item.name_campaign.toLowerCase().includes(e.target.value.toLowerCase())
    || item.sender.toLowerCase().includes(e.target.value.toLowerCase())
    || item.end_date.toLowerCase().includes(e.target.value.toLowerCase())
    || item.campaign_type.toLowerCase().includes(e.target.value.toLowerCase())

    );
    if (e.target.value.length == 0) {
      setDataSearch(dataCampaign);
    } else {
      setDataSearch(filtered);
    }
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h2>{steps == 2 ? "Tipo de campaña" : "Campaña"}</h2>
        {steps == 0 && <h2 className={styles.steps}>Paso 1</h2>}
        {steps == 1 && <h2 className={styles.steps}>Paso 2</h2>}
        {steps == 2 && <h2 className={styles.steps}>Paso 3</h2>}
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
                  input.name == "days_past_due_type"
                  
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
                if(input.name == "account_balance_type"){
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
                          type="text"
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
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                            const formattedValue = new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                              maximumFractionDigits: 0, // Para COP no usamos decimales
                            }).format(rawValue);

                            // Actualiza el valor del input con el formato
                            e.target.value = formattedValue;
                          }
                          }
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
            </form>
            <button onClick={handleNewCampaign} className={styles.button}>
              <FaPlus />
              Nuevo
            </button>
          </div>
          <Table
            labels={labelsCampaign}
            data={dataSearch}
            actions={actions}
          />
          <div className={styles.pagination}>
        <Pagination total={pagination?.count} page={page} setPage={setPage} />
      </div>
        </>
      )}
    </div>
  );
};
