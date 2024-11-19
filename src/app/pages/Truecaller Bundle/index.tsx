import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {OrdertListWrapper} from './chargeHistories/OrdertListWrapper'
import {DashboardWrapper} from './dashboard'

const TruecallerBundlePage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/charge-histories'
          element={
            <>
              <PageTitle>Truecaller Bundle Charge List</PageTitle>
              <OrdertListWrapper />
            </>
          }
        />
        <Route
          path='/dashboard'
          element={
            <>
              <PageTitle>Dashboard</PageTitle>
              <DashboardWrapper />
            </>
          }
        />

        <Route index element={<Navigate to='/truecaller-bundle/dashboard' />} />
      </Route>
    </Routes>
  )
}

export default TruecallerBundlePage
