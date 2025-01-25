import {
  FaDownload,
  FaEdit,
  FaEye,
  FaFileUpload,
  FaRegTrashAlt,
  FaSearch,
} from "react-icons/fa";
import styles from "./importData.module.scss";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/modalContext";
import { useNavigate } from "react-router-dom";
import { Table } from "@/components/table/table";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  deleteSourceFile,
  getAllSourceFiles,
  getSourceFileById,
} from "@/services/sourceFile.service";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { getUserById } from "@/services/users.service";
import { LoadingContext } from "@/contexts/LoadingContext";
import * as XLSX from "xlsx";

export const ImportData = () => {
  const [search, setSearch] = useState("");
  const { openModal, refetch, setRefetch, addData } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);
  const [data, setData] = useState([{}]);
  const [viewData, setViewData] = useState([]);
  const [dataSearch, setDataSearch] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const urlFile =
    import.meta.env.VITE_URL_FILE || "https://faysu.valcredit.co:8005";
  const labels = [
    {
      name: "date",
      label: "Fecha",
    },
    {
      name: "user",
      label: "Usuario",
    },
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "",
      label: "",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchInfo = async () => {
      const sourceFiles = await getAllSourceFiles(page);
      setPagination(sourceFiles.paging);
      Promise.all(
        sourceFiles.data.map(async (item) => {
          const user = await getUserById(item.user.UUID);
          return {
            id: item.UUID,
            date: new Date(item.created).toLocaleDateString(),
            user: user.data.firstName + " " + user.data.lastName,
            name: item.file_name,
          };
        })
      )
        .then((data) => {
          setData(data);
          setDataSearch(data);
        })
        .finally(() => setLoading(false));
    };
    fetchInfo();
  }, [refetch]);

  const actions = [
    /* {
      name: "Ver",
      icon: <FaEye />,
      action: (id) => {
        setLoading(true);
        getSourceFileById(id)
          .then((response) => {
            const fileUrl = `${urlFile}${response.data.file}`;
            fetch(fileUrl)
              .then((response) => response.arrayBuffer())
              .then((arrayBuffer) => {
                const data = new Uint8Array(arrayBuffer);
                const arr = new Array();
                for (let i = 0; i != data.length; ++i)
                  arr[i] = String.fromCharCode(data[i]);
                const bstr = arr.join("");
                const workbook = XLSX.read(bstr, { type: "binary" });
                const first_sheet_name = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[first_sheet_name];
                const dataParse = XLSX.utils.sheet_to_json(worksheet, {
                  raw: true,
                });
                setViewData(dataParse);
              });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      },
    }, */
    {
      name: "Descargar",
      icon: <FaDownload />,
      action: (id) => {
        setLoading(true);
        getSourceFileById(id)
          .then((response) => {
            console.log(response.data);
            const url = urlFile + response.data.file;
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", response.data.file_name);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      },
    },
    {
      name: "Editar",
      icon: <FaEdit />,
      action: (id) => {
        setLoading(true);
        getSourceFileById(id)
          .then((response) => {
            addData(response.data);
            openModal("importData");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      },
    },
    {
      name: "Eliminar",
      icon: <FaRegTrashAlt />,
      action: (id) => {
        setLoading(true);
        deleteSourceFile(id)
          .then(() => {
            setRefetch(!refetch);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      },
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const filtered = dataSearch.filter(
      (item) =>
        item.date.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.user.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length == 0) {
      setDataSearch(data);
    } else {
      setDataSearch(filtered);
    }
  };
  const handleBack = () => {
    navigate("/configuration");
  };
  const handleOpen = () => {
    openModal("importData");
  };
  const downloadPlantilla = () => {
    const url = import.meta.env.DEV
      ? "/campanas-faysu.xlsx"
      : "/faysu/campanas-faysu.xlsx";
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container}>
      <h2>Importar datos</h2>
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
        <div className={styles.containerBtn}>
          <button onClick={handleOpen} className={styles.button}>
            <FaFileUpload />
            Cargar plantilla
          </button>
          <button onClick={downloadPlantilla} className={styles.button}>
            <FaDownload />
            Descargar plantilla
          </button>
        </div>
      </div>
      <Table labels={labels} data={dataSearch} actions={actions} />
      <div className={styles.pagination}>
        <Pagination total={pagination?.count} page={page} setPage={setPage} />
      </div>
      <div className={styles.containerBack}>
        <button onClick={handleBack} className={styles.backbtn}>
          <RiArrowGoBackFill /> Volver
        </button>
      </div>
    </div>
  );
};
