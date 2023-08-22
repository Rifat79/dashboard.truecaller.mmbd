
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { OrdertListWrapper } from './order-list/OrdertListWrapper'



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

        <Route index element={<Navigate to='/reports/charge-histories' />} />
      </Route>
    </Routes>
  )
}

export default OrderPage
