import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import UsersPage from '../pages/users'
import OrganizationsPage from '../pages/organigetions'
import ActivationDashboard from '../pages/device-activation'
import ConfigurationPage from '../pages/configurations'

const PrivateRoutes = () => {
  const Merchants = lazy(() => import('../pages/marchents'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
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
          path='activation/*'
          element={
            <SuspensedView>
              <ActivationDashboard />
            </SuspensedView>
          }
        />
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
