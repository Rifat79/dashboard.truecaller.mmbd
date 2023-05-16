import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import { ModelListWrapper } from './game-wise'
import { RevenueSummary } from './revenue-summary'
import { ReportDetails } from './summary'
import { KeywordWiseRevenueWrapper } from './keyword-wise';

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
                path='details'
                element={
                    <>
                        <PageTitle>Push-Pull Revenue Details</PageTitle>
                        <ReportDetails />
                    </>
                }
            />
            <Route
                path='keyword-wise'
                element={
                    <>
                        <PageTitle>Keyword Wise Push-Pull Revenue Details</PageTitle>
                        <KeywordWiseRevenueWrapper />
                    </>
                }
            />
            <Route index element={<Navigate to='/users/index' />} />
        </Route>
    </Routes>
)

export default ReportsPage
