import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../../_metronic/layout/core'
import { ActivationDetailsWrapper } from './activation-details'
import { ModelListWrapper } from './model-wise'
import { SearchWrapper } from './search'

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
                        <PageTitle>Permissions</PageTitle>
                        <ActivationDetailsWrapper />
                    </>
                }
            />
            <Route index element={<Navigate to='/users/index' />} />
        </Route>
    </Routes>
)

export default ReportsPage
