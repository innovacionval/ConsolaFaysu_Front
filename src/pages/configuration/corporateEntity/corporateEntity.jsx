import { useContext, useEffect, useState } from "react";
import styles from "./corporateEntity.module.scss";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "@/contexts/modalContext";
import { FaEdit, FaPlus, FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { Table } from "@/components/table/table";
import { RiArrowGoBackFill } from "react-icons/ri";
import { getAllCorporateImages, getCorporateImageById } from "@/services/corporateImage.service";
import { Pagination } from "@/components/shared/pagination/Pagination";

export const CorporateEntity = () => {
  const [search, setSearch] = useState("");
  const { openModal, refetch, addData } = useContext(ModalContext);
  const [data, setData] = useState([{}]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const labels = [
    {
      name: "name",
      label: "Nombre",
    },
    {
      name: "user",
      label: "Usuario",
    },
    {
      name: "logo",
      label: "Logo",
    },
    {
      name: "primaryColor",
      label: "Color Principal",
    },
    {
      name: "secondaryColor",
      label: "Color Secundario",
    },
    {
      name: "",
      label: "",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (search == "") {
      getAllCorporateImages().then((response) => {
        setPagination(response.paging);
        let dataCorporateImage = response.data.map((item) => {
          return {
            id: item.UUID,
            name: item.name,
            user: item.user,
            logo: item.logo,
            primaryColor: item.main_color,
            secondaryColor: item.secondary_color,
          };
        });
        setData(dataCorporateImage);
      });
    }
  }, [search, refetch]);

  const actions = [
    {
      name: "Editar",
      icon: <FaEdit />,
      action: async (id) => {
        const corporateEntity = await getCorporateImageById(id);
        openModal("corporateEntity");
        addData(corporateEntity.data);
      },
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
  };
  const handleOpen = () => {
    openModal("corporateEntity");
  };

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
