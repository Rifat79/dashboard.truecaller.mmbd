import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { MerchantsWrapper } from './lists'
import { Vertical } from './onboard/Vertical'

const MerchantsPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='index'
        element={
          <>
            <PageTitle >Merchants</PageTitle>
            <MerchantsWrapper />
          </>
        }
      />
      <Route
        path='new'
        element={
          <>
            <PageTitle>Add New Merchant</PageTitle>
            <Vertical />
          </>
        }
      />
      <Route index element={<Navigate to='/merchants/index' />} />
    </Route>
  </Routes>
)

export default MerchantsPage
