import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { DashboardWrapper } from './dashboard'

const ActivationDashboard = () => (
    <Routes>
        <Route element={<Outlet />}>
            <Route
                path='dashboard'
                element={
                    <>
                        <PageTitle>Activation DashBoard</PageTitle>
                        <DashboardWrapper />
                    </>
                }
            />
            <Route index element={<Navigate to='/activation/dashboard' />} />
        </Route>
    </Routes>
)

export default ActivationDashboard
