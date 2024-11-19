import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {AIHReport} from './AIHistory/OrdertListWrapper'
import {ADFReport} from './ArtDeepFilters/OrdertListWrapper'
import {BTSReport} from './BedtimeStories/OrdertListWrapper'
import {OrdertListWrapper} from './order-list/OrdertListWrapper'
import {UbundleReport} from './Ubundle/OrdertListWrapper'

const OrderPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/charge-histories'
          element={
            <>
              <PageTitle>Truecaller Charge List</PageTitle>
              <OrdertListWrapper />
            </>
          }
        />
        <Route
          path='/bts'
          element={
            <>
              <PageTitle>BedtimeStories</PageTitle>
              <BTSReport />
            </>
          }
        />
        <Route
          path='/ubundle'
          element={
            <>
              <PageTitle>Ubundle</PageTitle>
              <UbundleReport />
            </>
          }
        />
        <Route
          path='/adf'
          element={
            <>
              <PageTitle>ArtDeepFilters</PageTitle>
              <ADFReport />
            </>
          }
        />
        <Route
          path='/aih'
          element={
            <>
              <PageTitle>AIHistory</PageTitle>
              <AIHReport />
            </>
          }
        />

        <Route index element={<Navigate to='/reports/charge-histories' />} />
      </Route>
    </Routes>
  )
}

export default OrderPage
