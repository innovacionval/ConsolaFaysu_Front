import { FaDownload, FaEdit, FaEye, FaFileUpload, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import styles from './importData.module.scss'
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/contexts/modalContext';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { deleteSourceFile, getAllSourceFiles, getSourceFileById } from '@/services/sourceFile.service';
import { Pagination } from '@/components/shared/pagination/Pagination';
import { getUserById } from '@/services/users.service';
import { LoadingContext } from '@/contexts/LoadingContext';

export const ImportData = () => {
  const [search, setSearch] = useState("");
  const {openModal, refetch, setRefetch, addData} = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const [data, setData] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const urlFile = import.meta.env.VITE_URL_FILE || "https://faysu.valcredit.co:8005"
  const labels = [{
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
  }];
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchInfo = async () => {
      const sourceFiles = await getAllSourceFiles(page)
      setPagination(sourceFiles.paging)
      Promise.all(sourceFiles.data.map(async (item) => {
        const user = await getUserById(item.user.UUID)
        return {
          id: item.UUID,
          date: new Date(item.created).toLocaleDateString(),
          user: user.data.firstName + " " + user.data.lastName,
          name: item.file_name,
        }
      })
    ).then((data) => setData(data)).finally(() => setLoading(false))
    }
    if(search == ""){
      fetchInfo()
    }
  }, [search, refetch]);


  const actions = [
    {
      name: "Ver",
      icon: <FaEye />,
      action: (id) => {
        setLoading(true)
        getSourceFileById(id).then((response) => {
          const url = urlFile + response.data.file;
          window.open(url, "_blank");
        }).catch((error) => {
          console.log(error);
        }).finally(() => setLoading(false));
      },
    },
    {
      name: "Descargar",
      icon: <FaDownload />,
      action: (id) => {
        setLoading(true)
        getSourceFileById(id).then((response) => {
          const url = window.URL.createObjectURL(new Blob([urlFile + response.data.file]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", response.data.file_name);
          document.body.appendChild(link);
          link.click();
          link.remove();
        }).catch((error) => {
          console.log(error);
        }).finally(() => setLoading(false));
      },
    },
    {
      name: "Editar",
      icon: <FaEdit />,
      action: (id) => {
        setLoading(true)
        getSourceFileById(id).then((response) => {
          addData(response.data);
          openModal("importData");
        }).catch((error) => {
          console.log(error);
        }).finally(() => setLoading(false));
      } ,
    },
    {
      name: "Eliminar",
      icon: <FaRegTrashAlt />,
      action: (id) => {
        setLoading(true)
        deleteSourceFile(id).then(() => {
          setRefetch(!refetch);
        }).catch((error) => {
          console.log(error);
        }).finally(() => setLoading(false));
      },
    },
  ];


  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (search === "") {
      setData(data);
    } else {
      setData(filtered);
    }
  };
  const handleBack = () => {
    navigate("/configuration");
  }
  const handleOpen = () => {
    openModal("importData");
  }

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
          <button>
            <FaSearch />
          </button>
        </form>
        <div className={styles.containerBtn}>
          <button onClick={handleOpen} className={styles.button}>
          <FaFileUpload />
            Cargar plantilla
          </button>
        </div>
      </div>
      <Table labels={labels} data={data} actions={actions} />
      <div className={styles.pagination}>
        <Pagination total={pagination?.count} page={page} setPage={setPage} />
      </div>
      <div className={styles.containerBack}>
        <button onClick={handleBack} className={styles.backbtn}>
          <RiArrowGoBackFill /> Volver
        </button>
      </div>
    </div>
  )
}
