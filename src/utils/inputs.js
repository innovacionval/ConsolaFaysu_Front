export const inputsCampaign = (watchSource, importData) => {
  return [
    {
      label: "Fuente",
      name: "source2",
      type: "select",
      isVisibility: true,
      options: [
        {
          value: "giitic",
          label: "Giitic",
        },
        {
          value: "importador",
          label: "Importador",
        },
      ],
    },
    {
      label: "Empresa/importador",
      name: "source",
      isVisibility: true,
      type: "select",
      options: importData.map((item) => {
        return {
          value: item.UUID,
          label: item.file_name,
        };
      }),
    },
    {
      label: "Cliente",
      name: "client",
      isVisibility: true,
      type: "select",
    },
    {
      label: "Estado de obligación",
      name: "obligationState",
      type: "select",
      isVisibility: watchSource == "importador" ? false : true,
      options: [
        {
          value: "active",
          label: "Activa",
        },
        {
          valeu: "pause",
          label: "Pausa",
        },
      ],
    },
    {
      label: "Clasificación",
      name: "classification",
      type: "select",
      isVisibility: watchSource == "importador" ? false : true,
      options: [
        {
          value: "LIBRANZA",
          label: "LIBRANZA",
        },
        {
          value: "EDUCATIVA",
          label: "EDUCATIVA",
        },
        {
          value: "COMPRA DE CARTERA",
          label: "COMPRA DE CARTERA",
        },
        {
          value: "FAST VAL",
          label: "FAST VAL",
        },
        {
          value: "COORSERPARK",
          label: "COORSERPARK",
        },
        {
          value: "COMPRA CARTERA UNIGERMANA",
          label: "COMPRA CARTERA UNIGERMANA",
        },
        {
          value: "SOAT",
          label: "SOAT",
        },
        {
          value: "CREDITO LIBRE INVERSIÓN",
          label: "CREDITO LIBRE INVERSIÓN",
        },
        {
          value: "SEGUROS",
          label: "SEGUROS",
        },
        {
          value: "HIPOTECARIO",
          label: "HIPOTECARIO",
        },
        {
          value: "ADMINISTRACIÓN CARTERA",
          label: "ADMINISTRACIÓN CARTERA",
        },
        {
          value: "FAST VAL CONVENIO",
          label: "FAST VAL CONVENIO",
        },
        {
          value: "AVAL EDUCATIVO",
          label: "AVAL EDUCATIVO",
        },
        {
          value: "EDUCATIVA COBERTURA",
          label: "EDUCATIVA COBERTURA",
        },
      ],
    },
    {
      label: "Saldos",
      name: "account_balance_type",
      type: "select",
      isVisibility: true,
      options: [
        {
          value: ">",
          label: "Mayor a",
        },
        {
          value: "<",
          label: "Menor a",
        },
        {
          value: "=",
          label: "Igual a",
        },
      ],
    },
    {
      label: "Días de mora",
      name: "days_past_due_type",
      type: "select",
      placeholder: "Mayor a",
      isVisibility: true,
      options: [
        {
          value: ">",
          label: "Mayor a",
        },
        {
          value: "<",
          label: "Menor a",
        },
        {
          value: "=",
          label: "Igual a",
        },
      ],
    },
    {
      label: "Tipo de gestión",
      name: "managementType",
      isVisibility: watchSource == "importador" ? false : true,
      type: "select",
    },
  ];
};

export const labelsCampaign = [
  {
    name: "name_campaign",
    label: "Nombre",
  },
  {
    name: "sender",
    label: "Remitente",
  },
  {
    name: "end_date",
    label: "Vigencia",
  },
  {
    name: "campaign_type",
    label: "Medio",
  },
  {
    name: "",
    label: "",
  },
];

export const inputsStep2 = (corporateData) => {
  return [
    {
      label: "Nombre de campaña",
      name: "name_campaign",
      type: "text",
    },
    {
      label: "Notificar a deudor solidario",
      name: "notify_the_co_debtor",
      type: "radio",
      options: [{
        value: true,
        label: "Si",
      }, {
        value: false,
        label: "No",
      }],
    },
    {
      label: "Fecha de notificación",
      name: "start_date",
      type: "date",
    },
    {
      label: "Repetir cada",
    },
    {
      label: "Vigencia de campaña",
      name: "end_date",
      type: "date",
    },
    {
      label: "Horario de envío",
      name: "send_time",
      type: "time",
    },
    {
      label: "Seleccionar identidad corporativa",
      name: "corporate_identity",
      type: "select",
      options: corporateData.map((item) => {
        return {
          value: item.UUID,
          label: item.name,
        };
      }),
    },
  ];
}

export const variablesStep3 = [
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
  {
    name:"Días de mora"
  }
];

export const configQuill = () => {
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

  return { modules, formats };
}