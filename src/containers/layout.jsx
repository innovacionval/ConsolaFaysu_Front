import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar/navbar'
import styles from './layout.module.scss'
import { ModalContext } from '@/contexts/modalContext';
import { useContext } from 'react';
import { Modal } from '@/components/modal/modal';

export const Layout = () => {
  const {isOpen} = useContext(ModalContext);
  console.log(isOpen)
  return (
    <>
    {isOpen && <Modal/>}
      <div className={styles.container}>
        <Navbar />
        <div className={styles.containerPages}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
