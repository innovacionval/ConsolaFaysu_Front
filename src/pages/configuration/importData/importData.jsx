import { FaDownload, FaEdit, FaEye, FaFileDownload, FaFileUpload, FaPlus, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import styles from './importData.module.scss'
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/contexts/modalContext';
import { useNavigate } from 'react-router-dom';
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';

export const ImportData = () => {
  const [search, setSearch] = useState("");
  const {openModal} = useContext(ModalContext);
  const [data, setData] = useState([{}]);
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
    if(search == ""){

      setData([
        {
          date: "12/12/2021",
          user: "JuanPerez",
          name: "Juan Perez",
        },
        {
          date: "12/12/2021",
          name: "Juan Perez",
          user: "JuanPerez",
        },
        {
          date: "12/12/2021",
          name: "Juan Perez",
          user: "JuanPerez",
        },
        {
          date: "12/12/2021",
          name: "Juan Perez",
          user: "JuanPerez",
        },
        {
          date: "12/12/2021",
          name: "Juan Perez",
          user: "JuanPerez",
        },
        
    ]);
  }

  }, [search]);
  const actions = [
    {
      name: "Ver",
      icon: <FaEye />,
      action: () => alert("Ver"),
    },
    {
      name: "Descargar",
      icon: <FaDownload />,
      action: () => alert("Descargar"),
    },
    {
      name: "Editar",
      icon: <FaEdit />,
      action: () => alert("Editar"),
    },
    {
      name: "Eliminar",
      icon: <FaRegTrashAlt />,
      action: () => alert("Eliminar"),
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
          <FaFileDownload />
            Descargar plantilla
          </button>
          <button onClick={handleOpen} className={styles.button}>
          <FaFileUpload />
            Cargar plantilla
          </button>
        </div>
      </div>
      <Table labels={labels} data={data} actions={actions} />
      <div className={styles.containerBack}>
        <button onClick={handleBack} className={styles.backbtn}>
          <RiArrowGoBackFill /> Volver
        </button>
      </div>
    </div>
  )
}
