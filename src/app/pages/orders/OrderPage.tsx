
import {Outlet, Route, Routes} from 'react-router-dom'
import { PageTitle} from '../../../_metronic/layout/core'
import {OrdertListWrapper} from './order-list/OrdertListWrapper'



const OrderPage = () => {

  return (
    <Routes>
        <Route element={<Outlet />}>
            <Route
              path='/'
              element={
                <>
                  <PageTitle>Truecaller Charge List</PageTitle>
                  <OrdertListWrapper />
                </>
              }
            />
        </Route>
    </Routes>
  )
}

export default OrderPage
