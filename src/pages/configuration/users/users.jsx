import { Table } from "@/components/table/table";
import styles from "./users.module.scss";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "@/contexts/modalContext";
import { getAllUsers, getUserById, updateUser } from "@/services/users.service";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { LoadingContext } from "@/contexts/LoadingContext";

export const Users = () => {
  const [search, setSearch] = useState("");
  const { openModal, refetch, setRefetch, addData } = useContext(ModalContext);
  const { setLoading } = useContext(LoadingContext);
  const [dataSearch, setDataSearch] = useState([{}]);
  const [data, setData] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const labels = [
    {
      name: "name",
      label: "Nombres",
    },
    {
      name: "identification",
      label: "Identificación",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "role",
      label: "Rol",
    },
    {
      name: "",
      label: "",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        console.log(response)
        setPagination(response.paging);
        let dataUser = response.data.map((item) => {
          return {
            id: item.UUID,
            name: item.firstName + " " + item.lastName,
            identification: item.identification,
            email: item.email,
            role: item.role,
            statusUser: item.emailVerified,
          };
        });
        setData(dataUser);
        setDataSearch(dataUser);
      })
      .catch((error) => {
        /* TODO hacer modal error de que se repita el correo*/
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [refetch]);

  const actions = [
    {
      name: "switch",
      action: (id) => {
        setLoading(true);
        const item = data.find((item) => item.id === id);
        item.statusUser = item.statusUser ? false : true;
        updateUser(id, { emailVerified: item.statusUser, role: item.role })
          .then(() => {
            setRefetch(!refetch);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      },
    },
    {
      name: "edit",
      icon: <FaEdit />,
      action: async (id) => {
        setLoading(true);
        const user = await getUserById(id);
        openModal("users");
        addData(user.data);
        setLoading(false);
      },
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const filtered = dataSearch.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    || item.identification.toLowerCase().includes(e.target.value.toLowerCase())
    || item.email.toLowerCase().includes(e.target.value.toLowerCase())
    || item.role.toLowerCase().includes(e.target.value.toLowerCase())
    || item.statusUser.toString().toLowerCase().includes(e.target.value.toLowerCase())

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
    openModal("users");
  };

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
};
