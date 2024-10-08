import { Table } from "@/components/table/table";
import styles from "./users.module.scss";
import { FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "@/contexts/modalContext";
import { getAllUsers, getUserById, updateUser } from "@/services/users.service";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { LoadingContext } from "@/contexts/LoadingContext";

export const Users = () => {
  const [search, setSearch] = useState("");
  const {openModal, refetch, setRefetch, addData} = useContext(ModalContext);
  const {setLoading} = useContext(LoadingContext);
  const [data, setData] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const labels = [{
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
    name: "statusUser",
    label: "Estado",
  },
  {
    name: "",
    label: "",
  }];
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    if(search == ""){
    getAllUsers().then((response) => {
      setPagination(response.paging)
      console.log(response)
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
    }).catch((error) => {
      console.log(error);
    }).finally(() => setLoading(false));
  }
  }, [search, refetch]);


  const actions = [
    {
      name: "switch",
      action: (id) => {
        setLoading(true)
        const item = data.find(item => item.id === id);
        item.statusUser = item.statusUser ? false : true;
        updateUser(id, {emailVerified: item.statusUser, role:item.role}).then(() => {
          setRefetch(!refetch)
        }).catch((error) => {
          console.log(error)
        }).finally(() => setLoading(false))
      }
    },
    {
      name: "edit",
      icon: <FaEdit />,
      action: async (id) => {
        setLoading(true)
        const user = await getUserById(id);
        openModal("users");
        addData(user.data);
        setLoading(false)
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
