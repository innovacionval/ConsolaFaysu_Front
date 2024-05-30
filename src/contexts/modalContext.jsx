import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState({
    users: false,
    corporateEntity: false,
  });
  const [dataTable, setDataTable] = useState({
    users: [],
    corporateEntity: [],
  });

  const openModal = (modal) => {
    setIsOpen({...isOpen, [modal]: true});
  }
  const closeModal = () => {
    setIsOpen({
      users: false,
      corporateEntity: false,
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