import { Table } from "@/components/table/table"

export const Users = () => {
  const labels = ['Nombres', 'Identidad', 'Email', 'Rol', 'Estado', 'Acciones']
  const data =[
    {
      name: 'Juan Perez',
      identity: '0801199900000',
      email: '',
      role: 'Admin',
      status: 'Activo',
    },
    {
      name: 'Juan Perez',
      identity: '0801199900000',
      email: '',
      role: 'Admin',
      status: 'Activo'
    },
    {
      name: 'Juan Perez',
      identity: '0801199900000',
      email: '',
      role: 'Admin',
      status: 'Activo'
    },
    {
      name: 'Juan Perez',
      identity: '0801199900000',
      email: '',
      role: 'Admin',
      status: 'Activo'
    },
    {
      name: 'Juan Perez',
      identity: '0801199900000',
      email: '',
      role: 'Admin',
      status: 'Activo'
    },
    {
      name: 'Juan Perez',
      identity: '0801199900000',
      email: '',
      role: 'Admin',
      status: 'Activo'
    },
  ]
  return (
    <>
    <Table labels={labels} data={data}/>
    </>
  )
}
