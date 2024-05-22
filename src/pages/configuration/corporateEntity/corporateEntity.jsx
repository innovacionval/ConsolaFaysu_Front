import { useContext, useEffect, useState } from 'react';
import styles from './corporateEntity.module.scss'
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '@/contexts/modalContext';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';

export const CorporateEntity = () => {
  
  const [search, setSearch] = useState("");
  const {openModal} = useContext(ModalContext);
  const [data, setData] = useState([{}]);
  const labels = ["Nombres", "Identidad", "Email", "Rol", "Estado", "Acciones"];
  const navigate = useNavigate();
  useEffect(() => {
    if(search == ""){

      setData([
        {
          name: "Juan Perez",
          identity: "0801199900000",
          email: "",
          role: "Admin",
          status: "Activo",
        },
        {
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Activo",
      },
      {
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Activo",
      },
      {
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Inactivo",
      },
      {
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Inactivo",
      },
      {
        name: "Jorge Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Activo",
      },
    ]);
  }

  }, [search]);
  const actions = [
    {
      name: "Editar",
      action: () => alert("Editar"),
    },
    {
      name: "Eliminar",
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
    openModal();
  }


  return (
    <div className={styles.container}>
      <h2>Entidad Corporativa</h2>
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
