import { ModalContext } from "@/contexts/modalContext";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSave } from "react-icons/bi";
import styles from "./modal.module.scss";
import { createCustomer, updateCustomer } from "@/services/customers.service";
import { LoadingContext } from "@/contexts/LoadingContext";

export const ModalClients = () => {
  const { closeModal, refetch, setRefetch, dataTable } = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Object.keys(dataTable).length > 0) {
      setValue("name", dataTable.name);
    }
  }, [dataTable]);

  const handleClose = () => {
    closeModal();
  };
  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Nombre del cliente",
      required: true,
    },
  ];

  const handleForm = (data) => {
    setLoading(true);
    if (Object.keys(dataTable).length > 0) {
      handleEdit(data);
    } else {
      createCustomer(data)
        .then(() => {
          setRefetch(!refetch);
          closeModal();
        })
        .catch((error) => {
          console.log(error);
        }).finally(()=>setLoading(false));
    }
  };

  const handleEdit = (data) => {
    updateCustomer(dataTable.UUID, data)
      .then(() => {
        setRefetch(!refetch);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>setLoading(false));
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div></div>
          <h3>Clientes</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <form onSubmit={handleSubmit(handleForm)} className={styles.body}>
          {inputs.map((input, index) => (
            <div className={styles.formGroup} key={`${input.name}${index}`}>
              <div className={styles.inputGroup}>
                <label htmlFor={input.name}>{input.label}</label>
                {input.type == "select" ? (
                  <select
                    {...register(input.name, {
                      required: { value: input.required, message: input.label },
                    })}
                  >
                    {input.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : input.type == "radio" ? (
                  input.options.map((option, index) => (
                    <div className={styles.radio} key={`${option} + ${index}`}>
                      <label htmlFor={option}>{option}</label>
                      <input
                        type="radio"
                        {...register(input.name, {
                          required: {
                            value: input.required,
                            message: input.label,
                          },
                        })}
                        value={option}
                      />
                    </div>
                  ))
                ) : (
                  <input
                    key={index}
                    type={input.type}
                    {...register(input.name, {
                      required: { value: input.required, message: input.label },
                    })}
                  />
                )}
              </div>
              {errors[input.name] && (
                <span className={styles.error}>{`El campo ${
                  errors[input.name].message
                } es requerido`}</span>
              )}
            </div>
          ))}
          <button type="submit">
            <BiSave />
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
