import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState({
    users: false,
    corporateEntity: false,
    importData: false,
    clients: false,
  });
  const [dataTable, setDataTable] = useState({})

  const [refetch, setRefetch] = useState(false);

  const openModal = (modal) => {
    setIsOpen({...isOpen, [modal]: true});
  }
  const closeModal = () => {
    setIsOpen({
      users: false,
      corporateEntity: false,
      importData: false,
      clients:false
    });
    cleanData();
  }
  const addData = (data) => {
    setDataTable(data);
  }

  const cleanData = () => {
    setDataTable({});
  }


  return (
    <ModalContext.Provider value={{isOpen, openModal, closeModal, addData, dataTable, refetch, setRefetch}}>
      {children}
    </ModalContext.Provider>
  )
}