import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "./step3.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaPaperclip, FaStar } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

export const Step3 = ({
  handleSubmit,
  register,
  errors,
  onSubmit,
  handleBack,
  setValue,
  watch,
}) => {
  const inputsRadio = [
    {
      name: "typeCampaignStep3",
      type: "radio",
      options: ["E-mail", "SMS", "Llamada", "WhatsApp"],
    },
  ];
  const [selectedOption, setSelectedOption] = useState("E-mail");
  const [openVariables, setOpenVariables] = useState(false);
  const [valueMessage, setValueMessage] = useState("");
  const quillRef = useRef(null);
  const maxLength = 300;
  const message = watch("message");

  useEffect(() => {
    setValue("typeCampaignStep3", "E-mail");
  }, []);

  useEffect(() => {
    const editor = quillRef?.current?.getEditor();

    // Intercepta el evento de cambio de texto
    editor?.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        const currentLength = editor.getLength();
        if (currentLength > maxLength) {
          // Si el texto añadido excede el límite, remuévelo
          editor.deleteText(maxLength, currentLength);
        }
      }
    });
  }, [quillRef]);

  const onChangeTypeCampaign = (e) => {
    setValue("typeCampaignStep3", e.target.value);
    setSelectedOption(e.target.value);
    setValue("message", "");
    setValue("subject", "");
    setValue("file", "");
  };
  const handleChangeVariables = (e, name) => {
    if (selectedOption != "E-mail") {
      const cursorPosition = document.getElementById("message").selectionStart;
      const currentText = message;
      const newText =
        currentText.slice(0, cursorPosition) +
        `{{${name}}}` +
        currentText.slice(cursorPosition);
      setValue("message", newText);
    } else {
      const editor = quillRef.current.getEditor();
      const cursorPosition = editor.getSelection().index;
      editor.insertText(cursorPosition, `{{${name}}}`);
    }
  };
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "super",
    "sub",
    "header",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "clean",
  ];

  const variables = [
    {
      name: "Nombres",
      value: "juan",
    },
    {
      name: "Saldo",
      value: "12312",
    },
    {
      name: "Fecha de pago",
      value: "12/12/2021",
    },
    {
      name: "Cliente",
      value: "Cliente",
    },
    {
      name: "No. Obligación",
      value: "123123123",
    },
  ];

  return (
    <>
      <h2>Paso 3</h2>
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
                          option == selectedOption
                            ? styles.active
                            : styles.radio
                        }
                      >
                        <input
                          {...register(input.name, { required: true })}
                          type="radio"
                          name={input.name}
                          value={option}
                          onChange={onChangeTypeCampaign}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
                {selectedOption == "E-mail" ? (
                  <>
                    <div className={styles.containerInput}>
                      <input
                        type="text"
                        {...register("subject", { required: true })}
                        placeholder="Asunto"
                      />
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
                    <textarea
                      id="message"
                      className={styles.textAreaSMS}
                      {...register("message", { required: true })}
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
              Siguiente
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
