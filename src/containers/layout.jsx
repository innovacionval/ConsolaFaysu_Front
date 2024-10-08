import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar/navbar'
import styles from './layout.module.scss'
import { ModalContext } from '@/contexts/modalContext';
import { useContext } from 'react';
import { ModalUsers } from '@/components/users/modal/modal';
import { ModalCorporateEntity } from '@/components/corporateEntity/modal/modal';
import { ModalImportData } from '@/components/importData/modal/modal';
import { ModalClients } from '@/components/clients/modal/modal';
import { LoadingContext } from '@/contexts/LoadingContext';
import { Loading } from '@/components/shared/loading/Loading';
import { ModalSender } from '@/components/sender/modal/modal';


export const Layout = () => {
  const {isOpen} = useContext(ModalContext);
  const {loading} = useContext(LoadingContext);
  
  return (
    <>
    {isOpen.users && <ModalUsers/>}
    {isOpen.corporateEntity && <ModalCorporateEntity/>}
    {isOpen.importData && <ModalImportData/>}
    {isOpen.clients && <ModalClients/>}
    {isOpen.sender && <ModalSender/>}
    {loading && <Loading/>}
      <div className={styles.container}>
        <Navbar />
        <div className={styles.containerPages}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
