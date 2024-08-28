import { ModalContext } from "@/contexts/modalContext";
import styles from "./modal.module.scss";
import { useContext, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { MultipleSelect } from "@/components/shared/multipleSelect/MultipleSelect";
import { getAllCustomersTotal } from "@/services/customers.service";
import { createSourceFile, updateSourceFile } from "@/services/sourceFile.service";
import { LoadingContext } from "@/contexts/LoadingContext";
import { jwtDecode } from "jwt-decode";
import { getAllUsers } from "@/services/users.service";

export const ModalImportData = () => {
  const { closeModal, refetch, setRefetch, dataTable } =
    useContext(ModalContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState("Archivo no seleccionado");
  const [optionsClient, setOptionsClient] = useState([]);
  const [userId , setUserId] = useState("");
  const [clients, setClients] = useState([]);
  const {setLoading} = useContext(LoadingContext);

  console.log(dataTable)

  useEffect(() => {
    if (Object.keys(dataTable).length > 0) {
      setValue("date", dataTable.date);
      setValue("user", dataTable.user);
      setValue("name", dataTable.file_name);
      setClients(dataTable.customers.map((item) => item)
      )
    }
  }, [dataTable]);

  useEffect(() => {
    const decodeToken = jwtDecode(sessionStorage.getItem("token"));
    getAllUsers().then((data) => {
      const user = data.data.find((item) => item.email === decodeToken.email);
      setUserId(user.UUID);
      setValue("user", user.firstName + " " + user.lastName);
    });
  }, []);
  const inputs = [
    {
      type: "text",
      name: "user",
      label: "Usuario",
      required: false,
      disabled: true,
    },
    {
      type: "text",
      name: "name",
      label: "Nombre",
      required: true,
      disabled: false,
    },
    {
      name: "client",
      label: "Cliente",
      requierd: true,
      disabled: false,
    },
    {
      type: "file",
      name: "file",
      label: "Cargar",
      required: true,
      disabled: false,
    },
  ];
  useEffect(() => {
    getAllCustomersTotal().then((data) => {
      setOptionsClient(
        data.data.map((item) => {
          return {
            value: item.UUID,
            label: item.name,
          };
        })
      );
    });
  }, []);


  const onSubmit = (data) => {
    setLoading(true);
    if(Object.keys(dataTable).length > 0) {
      handleEdit(data);
      return;
    }
    handleCreate(data);
  };
  const handleCreate = (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("file", data.file[0]);
    formData.append("file_name", fileName);
    clients.forEach((client) => {
      formData.append("customers", client);
    });
    createSourceFile(formData).then(() => {
      setRefetch(!refetch);
      closeModal();
    }).catch((error) => {
      console.log(error);
    }).finally(() => setLoading(false));
  };
  const handleEdit = (data) => {
    console.log(data)
    setLoading(true);
    const formDataEdit = new FormData();
    if(data.file) {
      formDataEdit.append("file", data.file[0]);
      formDataEdit.append("file_name", fileName);
    }
    clients.forEach((client) => {
      formDataEdit.append("customers", client);
    });
    const dataEdit = Object.fromEntries(formDataEdit);
    if(Object.keys(dataEdit).length === 0) {
      closeModal();
      setLoading(false);
      return;
    }
    updateSourceFile(dataTable.UUID, formDataEdit).then(() => {
      setRefetch(!refetch);
      closeModal();
    }).catch((error) => {
      console.log(error);
    }).finally(() => setLoading(false));
  }
  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div></div>
          <h3>Importar Datos</h3>
          <button onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
          {inputs.map((input, index) => (
            <div className={styles.formGroup} key={`${input.name}${index}`}>
              <div className={styles.inputGroup}>
                <label htmlFor={input.name}>{input.label}</label>
                {input.type === "file" ? (
                  <>
                    <input
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      hidden
                      type={input.type}
                      {...register(input.name, {
                        required: {
                          value: input.required,
                          message: input.label,
                        },
                        onChange: (e) => onChangeFile(e),
                      })}
                      id={input.name}
                    />
                    <label className={styles.btnFile} htmlFor={input.name}>
                      Adjuntar
                    </label>
                    <p>{fileName}</p>
                  </>
                ) : input.name == "client" ? (
                  <MultipleSelect clients={clients} setClients={setClients} input={input} data={optionsClient} />
                ) : (
                  <input
                    type={input.type}
                    {...register(input.name, {
                      required: { value: input.required, message: input.label },
                    })}
                    disabled={input.disabled}
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
            <BiSave /> Guardar{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
