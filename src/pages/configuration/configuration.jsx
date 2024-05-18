
import styles from './configuration.module.scss'
import { FaRegBuilding, FaUser } from 'react-icons/fa'
import { MdDriveFolderUpload } from 'react-icons/md'
import { Link } from 'react-router-dom'
export const Configuration = () => {
  const card = [
    {
      icon: <FaUser />,
      title: 'Usuarios',
      url: '/configuration/users'
    },
    {
      icon: <FaRegBuilding />,
      title: 'Entidad Corporativa',
      url: '/configuration/corporate-entity'
    },
    {
      icon: <MdDriveFolderUpload />,
      title: 'Importar Datos',
      url: '/configuration/import-data'
    },
]
  return (
    <div className={styles.containerConfiguration}>
      <div className={styles.containerCards}>
      {
        card.map((item, index) => (
          <Link to={item.url} className={styles.card} key={index}>
            <i>{item.icon}</i>
            <h3>{item.title}</h3>
          </Link>
        ))
      }
      </div>
    </div>
  )
}
