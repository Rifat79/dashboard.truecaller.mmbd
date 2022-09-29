import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import { getAuth } from '../../modules/auth'
import { BrandWrapper } from './brands'
import {PermissionsWrapper} from './permissions'
import {RolesWrapper} from './roles'
import {UsersWrapper} from './userlist'

const BusinessOrganizationPage = () => {
  const auth = getAuth()
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='index'
          element={
            <>
              <PageTitle description={auth?.user?.organizationName || ''}>Business Organizations</PageTitle>
              <UsersWrapper />
            </>
          }
        />

        <Route
          path='brands'
          element={
            <>
              <PageTitle description={auth?.user?.organizationName || ''}>Brands</PageTitle>
              <BrandWrapper />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default BusinessOrganizationPage
