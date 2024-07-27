import { FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import styles from './clients.module.scss'
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/contexts/modalContext';

export const Clients = () => {
  const [search, setSearch] = useState("");
  const {openModal} = useContext(ModalContext);
  const [data, setData] = useState([{}]);
  const labels = ["id", "Nombres", ""];
  const navigate = useNavigate();
  useEffect(() => {
    if(search == ""){

      setData([
        {
          id: 1,
          name: "Papeles RR",
        },
        {
        id: 2,
        name: "Papelera FK",
      },
      {
        id: 3,
        name: "Forest Spa Look",
      },
      {
        id: 4,
        name: "Escuela de formación aeronáutica EFA",
      },
      {
        id: 5,
        name: "Urban 960",

      },
      {
        id: 6,
        name: "Iris",
      },
      {
        id: 7,
        name: "Alheli",
      },
      {
        id: 8,
        name: "Atlantico",
      },
      {
        id: 9,
        name: "Alameda de Villamayor II",
      },
      {
        id: 10,
        name: "Cerezo",
      },
      {
        id: 11,
        name: "Carmesi",
      },
    ]);
  }

  }, [search]);
  const actions = [
/*     {
      name: "switch",
      action: (id) => {
        const item = data.find(item => item.id === id);
        item.status = item.status === 'Activo' ? 'Inactivo' : 'Activo';
        setData([...data]);
      }
    }, */
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
    openModal("clients");
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
}
