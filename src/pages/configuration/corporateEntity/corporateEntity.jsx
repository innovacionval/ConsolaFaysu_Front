import { useContext, useEffect, useState } from 'react';
import styles from './corporateEntity.module.scss'
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '@/contexts/modalContext';
import { FaEdit, FaPlus, FaRegTrashAlt, FaSearch } from 'react-icons/fa';
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';

export const CorporateEntity = () => {
  
  const [search, setSearch] = useState("");
  const {openModal} = useContext(ModalContext);
  const [data, setData] = useState([{}]);
  const labels = ["Nombre", "Usuario", "Logo", "Color Principal", "Color Secundario", "Acciones"];
  const navigate = useNavigate();
  useEffect(() => {
    if(search == ""){

      setData([
        {
          name: "Juan Perez",
          user: "JuanPerez",
          logo: "",
          primaryColor: "#F22ab2",
          secondaryColor: "#ffffff",
        },
        {
          name: "Juan Perez",
          user: "JuanPerez",
          logo: "",
          primaryColor: "#000000",
          secondaryColor: "#ffffff",
        },
        {
          name: "Juan Perez",
          user: "JuanPerez",
          logo: "",
          primaryColor: "#000000",
          secondaryColor: "#ffffff",
        },
        {
          name: "Juan Perez",
          user: "JuanPerez",
          logo: "",
          primaryColor: "#000000",
          secondaryColor: "#ffffff",
        },
        {
          name: "Juan Perez",
          user: "JuanPerez",
          logo: "",
          primaryColor: "#000000",
          secondaryColor: "#ffffff",
        },
    ]);
  }

  }, [search]);
  const actions = [
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
    openModal("corporateEntity");
  }


  return (
    <div className={styles.container}>
      <h2>Identidad Corporativa</h2>
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
        <button onClick={handleOpen} className={styles.button}>
          <FaPlus />
          Nuevo
        </button>
      </div>
      <Table labels={labels} data={data} actions={actions} />
      <div className={styles.containerBack}>
        <button onClick={handleBack} className={styles.backbtn}>
          <RiArrowGoBackFill /> Volver
        </button>
      </div>
    </div>
  );
}
