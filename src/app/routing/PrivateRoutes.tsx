import {FC, Suspense} from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {RootState} from '../../_metronic/redux/store'
import {DashboardWrapper} from '../pages/dashboard'
import DevelopersPage from '../pages/Developer'
import OrderPage from '../pages/reports/OrderPage'
import UsersPage from '../pages/users'

const PrivateRoutes = () => {
  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )
  const {data}: any = response || {}
  const {data: userPermission} = data || []

  return (
    userPermission &&
    userPermission.length > 0 && (
      <Routes>
        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path='auth/*' element={<Navigate to='/' />} />
          {/* Pages */}
          <Route path='dashboard' element={<DashboardWrapper />} />
          <Route path='reports/*' element={<OrderPage />} />
          {/* <Route path='users' /> */}
          {userPermission?.filter((f: any) => f.group_route.includes('users')).length > 0 && (
            <Route
              path='users/*'
              element={
                <SuspensedView>
                  <UsersPage />
                </SuspensedView>
              }
            />
          )}

          {userPermission?.filter((f: any) => f.group_route.includes('developer')).length > 0 && (
            <Route
              path='developer/*'
              element={
                <SuspensedView>
                  <DevelopersPage />
                </SuspensedView>
              }
            />
          )}

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
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
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

export {PrivateRoutes}
