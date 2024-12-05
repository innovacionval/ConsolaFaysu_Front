import { FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import styles from './sender.module.scss'
import { Table } from '@/components/table/table';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '@/contexts/modalContext';
import { Pagination } from '@/components/shared/pagination/Pagination';
import { LoadingContext } from '@/contexts/LoadingContext';
import { getAllSenderEmails, getSenderEmailById, updateSenderEmail } from '@/services/senderEmail.service';

export const Senders = () => {
  const [search, setSearch] = useState("");
  const {openModal, setRefetch, refetch, addData} = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const [data, setData] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [dataSearch, setDataSearch] = useState([{}]);
  const [page, setPage] = useState(1);
  const labels = [
  {
    name: "sender_email",
    label: "Correo",
  },
  {
    name: "phone",
    label: "Teléfono",
  },
  {
    name: "",
    label: "",
  }];
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
      getAllSenderEmails(page).then((response) => {
        console.log(response)
        setPagination(response.paging)
        const fixData = response.data.map((item) => {
          return {
            ...item,
            id: item.UUID,
            sender_email: item.sender_email,
            phone: item.phone
          }
        })
        setData(fixData);
        setDataSearch(fixData);
      }).catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false));
  }, [refetch, page]);
  const actions = [
    {
      name: "switch",
      action: (id) => {
        setLoading(true);
        const item = data.find((item) => item.id === id);
        item.status = !item.status;
        updateSenderEmail(id, {status: item.status}).then((response) => {
          setRefetch(!refetch);
        }).catch((error) => {
          console.log(error);
        }).finally(() => setLoading(false));

      }
    },
    {
      name: "edit",
      icon: <FaEdit />,
      action: (id) => {
        setLoading(true);
        console.log(id)
        getSenderEmailById(id).then((response) => {
          addData(response.data);
          openModal("sender");
        }).catch((error) => {
          console.log(error);
        }).finally(() => setLoading(false));
      }
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(dataSearch)
    const filtered = dataSearch.filter((item) =>
      item.sender_email.toLowerCase().includes(e.target.value.toLowerCase())
    || item.phone.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value.length == 0) {
      setDataSearch(data);
    } else {
      setDataSearch(filtered);
    }
  };
  const handleBack = () => {
    navigate("/configuration");
  }
  const handleOpen = () => {
    openModal("sender");
  }
  return (
    <div className={styles.container}>
      <h2>Remitentes</h2>
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
        <button onClick={handleOpen} className={styles.button}>
          <FaPlus />
          Nuevo
        </button>
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
}
