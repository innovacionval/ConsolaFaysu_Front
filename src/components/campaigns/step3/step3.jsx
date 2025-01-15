import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "./step3.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaPaperclip, FaStar } from "react-icons/fa";
import "react-quill/dist/quill.snow.css";
import { configQuill, variablesStep3 } from "@/utils/inputs";

export const Step3 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
  setValue,
  watch,
  usersData,
  valueMessage,
  image,
  setImage
}) => {
  
  const [selectedOption, setSelectedOption] = useState("correo");
  const [openVariables, setOpenVariables] = useState(false);
  const [isSubjectFocused, setIsSubjectFocused] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const maxLength = 300;
  const message = watch("message_body");

  useEffect(() => {
    setSelectedOption("correo");
    setValue("campaign_type", "correo");
  }, []);


  const inputsRadio = [
    {
      name: "campaign_type",
      type: "radio",
      options: [
        {
          value: "correo",
          label: "Correo",
        },
        {
          value: "sms",
          label: "SMS",
        },
        {
          value: "llamada",
          label: "Llamada",
        },
        {
          value: "whatsapp",
          label: "WhatsApp",
        },
      ]
    },
  ];



  const onChangeTypeCampaign = (e) => {
    setValue("campaign_type", e.target.value);
    setSelectedOption(e.target.value);
    setValue("message_body", "");
    setValue("subject", "");
    setValue("file", "");
  };
  const subjectElement = document.getElementById("subject");
  const messageElement = document.getElementById("message");

  useEffect(() => {
    const handleMouseOver = () => {
      setIsSubjectFocused(true);
    };

    const handleMouseOverMessage = () => {
      setIsSubjectFocused(false);
    };

    
  

    if (subjectElement) {
      subjectElement.addEventListener("focus", handleMouseOver);
    }

    if (messageElement) {
      messageElement.addEventListener("focus", handleMouseOverMessage);
    }
  
    // Cleanup the event listeners when the component unmounts
    return () => {
      if (subjectElement) {
        subjectElement.removeEventListener("focus", handleMouseOver);
      }
      if (messageElement) {
        messageElement.removeEventListener("focus", handleMouseOverMessage);
      }
    };
  }, [subjectElement]);
  

  
  const handleChangeVariables = (e, name) => {
    setIsSubjectFocused(false);
    if (selectedOption !== "correo") {
      const cursorPosition = document.getElementById("message").selectionStart;
      const currentText = watch("message_body");
      const newText =
        currentText.slice(0, cursorPosition) +
        `{{${name}}}` +
        currentText.slice(cursorPosition);
      setValue("message_body", newText);
    } else {
      if (isSubjectFocused) {
        handleChangeVariablesOnSubject(e, name);
        return;
      }
      
      const cursorPosition = document.getElementById("message").selectionStart;
      const currentText = watch("message_body");
      const newText =
        currentText.slice(0, cursorPosition) +
        `{{${name}}}` +
        currentText.slice(cursorPosition);
      setValue("message_body", newText);

    }
  };


  const handleChangeVariablesOnSubject = (e, name) => {
    const cursorPosition = document.getElementById("subject").selectionStart;
    const currentText = watch("subject");
    const newText =
      currentText.slice(0, cursorPosition) +
      `{{${name}}}` +
      currentText.slice(cursorPosition);
    setValue("subject", newText);
    setIsSubjectFocused(false);
  }

  const onChangeFile = (e) => {
    const maxSize = 2 * 1024 * 1024
    if(e.target.files[0].size > maxSize){
      setErrorFile(true)
      return
    }
    else{
      setErrorFile(false)
    }
    setImage(URL.createObjectURL(e.target.files[0]));
    setValue("file", e.target.files[0]);
  };

  const variables = variablesStep3;


  return (
    <>
      <div className={styles.containerCampaignType}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {inputsRadio.map((input, index) => {
            return (
              <div key={`${index}_${input.name}`} className={styles.formGroup}>
                {input.type === "radio" && (
                  <div className={styles.containerRadio}>
                    {input.options.map((option, index) => (
                      <div
                        key={`${index}_${option}`}
                        className={
                          option.value == selectedOption
                            ? styles.active
                            : styles.radio
                        }
                      >
                        <input
                          {...register(input.name, { required: true })}
                          type="radio"
                          name={input.name}
                          value={option.value}
                          onChange={onChangeTypeCampaign}
                        />
                        <label>{option.label}</label>
                      </div>
                    ))}
                  </div>
                )}
                {selectedOption == "correo" ? (
                  <>
                    <div className={styles.containerInput}>
                      <div className={styles.containerRemitente}>
                        <select type="text" placeholder="Remitente" {...register("sender",{ required: true})}>
                          <option value="" disabled>Remitente</option>
                          {usersData.map((user, index) => (
                            <option key={`${user.id}_${index}`} value={user.id}>
                              {user.email}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          {...register("subject", { required: true })}
                          placeholder="Asunto"
                          id="subject"
                        />
                      </div>
                      <div className={styles.containerInputFile}>
                        <input
                          hidden
                          type="file"
                          {...register("file")}
                          id="file"
                          accept="image/*"
                          onChange={onChangeFile}
                        />
                        {errorFile && <span className={styles.error}>El archivo no debe superar los 2MB</span>}
                        <label htmlFor="file">
                          <FaPaperclip />
                          Cargar imagen
                        </label>
                        {image && (
                          <img
                            src={image}
                            alt="imagen"
                            className={styles.image}
                            width={100}
                          />
                        )}

                        <button
                          className={styles.btnVariables}
                          onClick={() => setOpenVariables(!openVariables)}
                          type="button"
                        >
                          <FaStar />
                          Variables
                        </button>
                      </div>
                    </div>
                    <textarea
                      id="message"
                      className={styles.containerText}
                      {...register("message_body", { required: true })}
                    />
                    {errors[input.name] && (
                      <span className={styles.error}>{`El campo ${
                        errors[input.name].message
                      } es requerido`}</span>
                    )}
                  </>
                ) : (
                  <div className={styles.containerSMS}>
                    <h3 className={styles.titleSMS}>Ingresa el texto</h3>
                    <select type="text" placeholder="Remitente" >
                      <option value="Remitente">Remitente</option>
                      {usersData.map((user, index) => (
                        <option key={`${user.id}_${index}`} value={user.id}>
                          {user.phone}
                        </option>
                      ))}
                    </select>
                    <textarea
                      id="message"
                      className={styles.textAreaSMS}
                      {...register("message_body", { required: true })}
                    />
                    <p>{`${
                      message?.length == undefined ? 0 : message.length
                    } / ${maxLength}`}</p>
                    <div className={styles.containerInputFileSMS}>
                      {selectedOption == "whatsapp" && (
                        <>
                          <input
                            hidden
                            type="file"
                            {...register("file")}
                            id="file"
                          />
                          <label className={styles.btnImage} htmlFor="file">
                            <FaPaperclip />
                            Cargar imagen
                          </label>
                        </>
                      )}
                      <button
                        className={styles.btnVariables}
                        onClick={() => setOpenVariables(!openVariables)}
                      >
                        <FaStar />
                        Variables
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className={styles.containerBtn}>
            <button className={styles.button} onClick={handleBack}>
              <RiArrowGoBackFill /> Atrás
            </button>
            <button className={styles.button}>
              <MdArrowForwardIos />
              Guardar
            </button>
          </div>
        </form>
        <div
          className={openVariables ? styles.containerVariables : styles.hidden}
        >
          <div className={styles.containerVariablesContent}>
            <h3>Selecciona variables</h3>
            {variables.map((variable, index) => (
              <button
                key={`${variable.name}${index}`}
                onClick={(e) => handleChangeVariables(e, variable.value)}
              >
                {variable.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
