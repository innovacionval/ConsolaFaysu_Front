import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "./step3.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaPaperclip, FaStar } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { getAllUsers } from "@/services/users.service";
import { configQuill, variablesStep3 } from "@/utils/inputs";

export const Step3 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
  setValue,
  watch,
}) => {
  
  const [selectedOption, setSelectedOption] = useState("correo");
  const [openVariables, setOpenVariables] = useState(false);
  const [valueMessage, setValueMessage] = useState("");
  const [usersData, setUsersData] = useState([]);
  const quillRef = useRef(null);
  const maxLength = 300;
  const message = watch("message_body");

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

  useEffect(() => {
    setValue("campaign_type", "E-mail");
    getAllUsers().then((response) => {
      setUsersData(response.data.map((user) => {
        return {
          id: user.id,
          email: user.email,
        };
      }));
    });
  }, []);

  useEffect(() => {
    const editor = quillRef?.current?.getEditor();

    editor?.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        const currentLength = editor.getLength();
        if (currentLength > maxLength) {
          editor.deleteText(maxLength, currentLength);
        }
      }
    });
  }, [quillRef]);

  const onChangeTypeCampaign = (e) => {
    setValue("campaign_type", e.target.value);
    setSelectedOption(e.target.value);
    setValue("message_body", "");
    setValue("subject", "");
    setValue("file", "");
  };
  const handleChangeVariables = (e, name) => {
    if (selectedOption != "E-mail") {
      const cursorPosition = document.getElementById("message_body").selectionStart;
      const currentText = message;
      const newText =
        currentText.slice(0, cursorPosition) +
        `{{${name}}}` +
        currentText.slice(cursorPosition);
      setValue("message_body", newText);
    } else {
      const editor = quillRef.current.getEditor();
      const cursorPosition = editor.getSelection().index;
      editor.insertText(cursorPosition, `{{${name}}}`);
    }
  };
  const modules = configQuill().modules;

  const formats = configQuill().formats;

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
                      <div >
                        <select type="text" placeholder="Remitente">
                          <option value="Remitente">Remitente</option>
                          {usersData.map((user) => (
                            <option key={user.id} value={user.email}>
                              {user.email}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          {...register("subject", { required: true })}
                          placeholder="Asunto"
                        />
                      </div>
                      <div className={styles.containerInputFile}>
                        <input
                          hidden
                          type="file"
                          {...register("file")}
                          id="file"
                        />
                        <label htmlFor="file">
                          <FaPaperclip />
                          Cargar imagen
                        </label>
                        <button
                          className={styles.btnVariables}
                          onClick={() => setOpenVariables(!openVariables)}
                        >
                          <FaStar />
                          Variables
                        </button>
                      </div>
                    </div>
                    <ReactQuill
                      value={valueMessage}
                      onChange={setValueMessage}
                      modules={modules}
                      formats={formats}
                      className={styles.containerText}
                      ref={quillRef}
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
                      {usersData.map((user) => (
                        <option key={user.id} value={user.email}>
                          {user.email}
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
                      {selectedOption == "WhatsApp" && (
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
                onClick={(e) => handleChangeVariables(e, variable.name)}
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
