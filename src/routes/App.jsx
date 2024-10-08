import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import {Login} from '@/pages/login/login'
import { Layout } from '@/containers/layout'
import { Home } from '@/pages/home/home'
import { Configuration } from '@/pages/configuration/configuration'
import { Campaigns } from '@/pages/campaigns/campaigns'
import { Users } from '@/pages/configuration/users/users'
import { CorporateEntity } from '@/pages/configuration/corporateEntity/corporateEntity'
import { ImportData } from '@/pages/configuration/importData/importData'
import { Clients } from '@/pages/configuration/clients/clients'
import { Senders } from '@/pages/configuration/sender/sender'

function App() {

const { isLogged } = useContext(AuthContext)


  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/ConsolaFaysu_Front/'}>
      <Routes>
        {isLogged ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="configuration">
              <Route index element={<Configuration />} />
              <Route path="users" element={<Users />} />
              <Route path="corporate-entity" element={<CorporateEntity />} />
              <Route path="import-data" element={<ImportData />} />
              <Route path="clients" element={<Clients />} />
              <Route path="senders" element={<Senders />} />
            </Route>
            <Route path="campaigns" element={<Campaigns />} />
          </Route>
        ) : (
          <Route path="/*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App
