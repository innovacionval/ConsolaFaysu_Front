import { FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import styles from './clients.module.scss'
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/contexts/modalContext';
import { getAllCustomers, getCustomerById } from '@/services/customers.service';
import { Pagination } from '@/components/shared/pagination/Pagination';

export const Clients = () => {
  const [search, setSearch] = useState("");
  const {openModal, refetch, addData} = useContext(ModalContext);
  const [data, setData] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const labels = [
  {
    name: "name",
    label: "Nombres",
  },
  {
    name: "",
    label: "",
  }];
  const navigate = useNavigate();
  useEffect(() => {
    if(search == ""){
      getAllCustomers(page).then((response) => {
        setPagination(response.paging)
        console.log(response)
        let dataCustomer = response.data.map((item) => {
          return {
            id: item.UUID,
            name: item.name,
          };
        });
        setData(dataCustomer);
      });
  }

  }, [search, refetch, page]);
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
        getCustomerById(id).then((response) => {
          addData(response.data);
          openModal("clients");
        });
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
}
