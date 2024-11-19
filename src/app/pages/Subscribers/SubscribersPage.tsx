import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageTitle} from '../../../_metronic/layout/core'
import {SubscribersWrapper} from './subscribers-list/SubscribersWrapper'

const SubscribersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='/index'
          element={
            <>
              <PageTitle>Subscribers</PageTitle>
              <SubscribersWrapper />
            </>
          }
        />

        <Route index element={<Navigate to='/subscribers/index' />} />
      </Route>
    </Routes>
  )
}

export default SubscribersPage
