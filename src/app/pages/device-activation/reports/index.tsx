import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ActivationDetailsWrapper} from './activation-details'
import {DownloadsWrapper} from './downloads'
import { InboxSearchWrapper } from './inbox-search'
import {ModelListWrapper} from './model-wise'
import {SearchWrapper} from './search'

const ReportsPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='overview'
        element={
          <>
            <PageTitle>Activation Details</PageTitle>
            <ActivationDetailsWrapper />
          </>
        }
      />
      <Route
        path='inbox/search'
        element={
          <>
            <PageTitle>Inbox Search</PageTitle>
            <InboxSearchWrapper />
          </>
        }
      />
      <Route
        path='imei-search'
        element={
          <>
            <PageTitle>IMEI Search</PageTitle>
            <SearchWrapper />
          </>
        }
      />
      <Route
        path='model-wise'
        element={
          <>
            <PageTitle>All Model Lists</PageTitle>
            <ModelListWrapper />
          </>
        }
      />
      <Route
        path='downloads'
        element={
          <>
            <PageTitle>Downloads</PageTitle>
            <DownloadsWrapper />
          </>
        }
      />
      {/* <Route path='downloads' element={<Navigate to='/error/404' />} /> */}
      <Route index element={<Navigate to='/users/index' />} />
    </Route>
  </Routes>
)

export default ReportsPage
