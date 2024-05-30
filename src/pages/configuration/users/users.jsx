import { Table } from "@/components/table/table";
import styles from "./users.module.scss";
import { FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "@/contexts/modalContext";

export const Users = () => {
  const [search, setSearch] = useState("");
  const {openModal} = useContext(ModalContext);
  const [data, setData] = useState([{}]);
  const labels = ["id", "Nombres", "Identidad", "Email", "Rol", "Estado", "Acciones"];
  const navigate = useNavigate();
  useEffect(() => {
    if(search == ""){

      setData([
        {
          id: 1,
          name: "Juan Perez",
          identity: "0801199900000",
          email: "",
          role: "Admin",
          status: "Activo",
        },
        {
        id: 2,
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Activo",
      },
      {
        id: 3,
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Activo",
      },
      {
        id: 4,
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Inactivo",
      },
      {
        id: 5,
        name: "Juan Perez",
        identity: "0801199900000",
        email: "",
        role: "Admin",
        status: "Inactivo",
      },
      {
        id: 6,
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
      name: "switch",
      action: (id) => {
        // Find the item with the given id
        const item = data.find(item => item.id === id);
  
        // Toggle the status of the item
        item.status = item.status === 'Activo' ? 'Inactivo' : 'Activo';
  
        // Update the state with the new item
        setData([...data]);
      }
    },
    {
      name: "edit",
      icon: <FaEdit />,
      action: (id) => {
        console.log(id)
      }
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
    openModal("users");
  }

  return (
    <div className={styles.container}>
      <h2>Usuarios</h2>
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
};
