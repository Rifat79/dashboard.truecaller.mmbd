import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {DeveloperPageWrapper} from './CustomerWrapper'

const DevelopersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/index'
          element={
            <>
              <PageTitle>API & Documentation</PageTitle>
              <DeveloperPageWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/users/index' />} />
    </Routes>
  )
}

export default DevelopersPage
