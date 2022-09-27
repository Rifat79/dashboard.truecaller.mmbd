import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { DashboardWrapper } from './dashboard'
import ReportsPage from './reports'

const PushPullRevenue = () => (
    <Routes>
        <Route element={<Outlet />}>
            <Route
                path='dashboard'
                element={
                    <>
                        <PageTitle>Game Revenue</PageTitle>
                        <DashboardWrapper />
                    </>
                }
            />
            <Route
                path='reports/*'
                element={
                    <>
                        <PageTitle>Activation DashBoard</PageTitle>
                        <ReportsPage />
                    </>
                }
            />
            <Route index element={<Navigate to='/activation/dashboard' />} />
        </Route>
    </Routes>
)

export default PushPullRevenue
