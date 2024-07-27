import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState({
    users: false,
    corporateEntity: false,
    importData: false,
    clients: false
  });
  const [dataTable, setDataTable] = useState({
    users: [],
    corporateEntity: [],
    importData: [],
    clients:[]
  });

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
  }
  const addData = (modal, data) => {
    setDataTable({...dataTable, [modal]: [...dataTable[modal], data]});
  }


  return (
    <ModalContext.Provider value={{isOpen, openModal, closeModal, addData}}>
      {children}
    </ModalContext.Provider>
  )
}