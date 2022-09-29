import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { getAuth } from '../../modules/auth'
import { DashboardWrapper } from './dashboard'
import ReportsPage from './reports'

const ActivationDashboard = () => {
    const auth = getAuth()
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='dashboard'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Activation DashBoard</PageTitle>
                            <DashboardWrapper />
                        </>
                    }
                />
                <Route
                    path='reports/*'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Activation DashBoard</PageTitle>
                            <ReportsPage />
                        </>
                    }
                />
                <Route index element={<Navigate to='/activation/dashboard' />} />
            </Route>
        </Routes>
    )
                }

export default ActivationDashboard
