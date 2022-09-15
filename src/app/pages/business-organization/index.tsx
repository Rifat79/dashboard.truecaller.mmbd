import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import { BrandWrapper } from './brands'
import {PermissionsWrapper} from './permissions'
import {RolesWrapper} from './roles'
import {UsersWrapper} from './userlist'

const BusinessOrganizationPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='index'
        element={
          <>
            <PageTitle>Business Organizations</PageTitle>
            <UsersWrapper />
          </>
        }
      />

      <Route
        path='brands'
        element={
          <>
            <PageTitle>Brands</PageTitle>
            <BrandWrapper />
          </>
        }
      />
    </Route>
  </Routes>
)

export default BusinessOrganizationPage
