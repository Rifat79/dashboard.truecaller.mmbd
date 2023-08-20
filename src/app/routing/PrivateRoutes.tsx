import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { getAuth } from '../modules/auth'
import OrderPage from '../pages/orders/OrderPage'

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/' />} /> 
        {/* Pages */}
        <Route path='dashboard' element={<OrderPage />} />
        {/* Lazy Modules */}
        {/* <Route
          path='merchants/*'
          element={
            <SuspensedView>
              <Merchants />
            </SuspensedView>
          }
        />
        <Route
          path='users/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='configuration/*'
          element={
            <SuspensedView>
              <ConfigurationPage />
            </SuspensedView>
          }
        />
        <Route
          path='organizations/*'
          element={
            <SuspensedView>
              <OrganizationsPage />
            </SuspensedView>
          }
        />
        <Route
          path='business-organizations/*'
          element={
            <SuspensedView>
              <BusinessOrganizationPage />
            </SuspensedView>
          }
        />
        <Route
          path='activation/*'
          element={
            <SuspensedView>
              <ActivationDashboard />
            </SuspensedView>
          }
        />
        <Route
          path='revenue/*'
          element={
            <SuspensedView>
              <GameRevenue />
            </SuspensedView>
          }
        />
        <Route
          path='pushpull/*'
          element={
            <SuspensedView>
              <PushPullRevenue />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='profile'
          element={
            <SuspensedView>
              <Profile />
            </SuspensedView>
          }
        /> */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
