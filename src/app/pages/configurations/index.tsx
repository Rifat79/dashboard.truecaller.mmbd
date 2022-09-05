import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { GameKeywordsWrapper } from './game keywords'
import { RevenueListWrapper } from './revenue'

const ConfigurationPage = () => (
    <Routes>
        <Route element={<Outlet />}>
            <Route
                path='keyword'
                element={
                    <>
                        <PageTitle>Game Keywords</PageTitle>
                        <GameKeywordsWrapper />
                    </>
                }
            />
            <Route
                path='revenue'
                element={
                    <>
                        <PageTitle>Revenue</PageTitle>
                        <RevenueListWrapper />
                    </>
                }
            />
            <Route index element={<Navigate to='/users/index' />} />
        </Route>
    </Routes>
)

export default ConfigurationPage
