import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import { ModelListWrapper } from './game-wise'
import { RevenueSummary } from './revenue-summary'
import { ReportDetails } from './summary'

const ReportsPage = () => (
    <Routes>
        <Route element={<Outlet />}>
            <Route
                path='overview'
                element={
                    <>
                        <PageTitle>Revenue Summary</PageTitle>
                        <RevenueSummary />
                    </>
                }
            />
            <Route
                path='game-wise'
                element={
                    <>
                        <PageTitle>Game Wise</PageTitle>
                        <ModelListWrapper />
                    </>
                }
            />
            <Route
                path='details'
                element={
                    <>
                        <PageTitle>Revenue Details</PageTitle>
                        <ReportDetails />
                    </>
                }
            />
            <Route index element={<Navigate to='/users/index' />} />
        </Route>
    </Routes>
)

export default ReportsPage