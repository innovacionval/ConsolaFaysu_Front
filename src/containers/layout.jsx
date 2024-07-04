import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar/navbar'
import styles from './layout.module.scss'
import { ModalContext } from '@/contexts/modalContext';
import { useContext } from 'react';
import { ModalUsers } from '@/components/users/modal/modal';
import { ModalCorporateEntity } from '@/components/corporateEntity/modal/modal';
import { ModalImportData } from '@/components/importData/modal/modal';


export const Layout = () => {
  const {isOpen} = useContext(ModalContext);
  return (
    <>
    {isOpen.users && <ModalUsers/>}
    {isOpen.corporateEntity && <ModalCorporateEntity/>}
    {isOpen.importData && <ModalImportData/>}
      <div className={styles.container}>
        <Navbar />
        <div className={styles.containerPages}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
