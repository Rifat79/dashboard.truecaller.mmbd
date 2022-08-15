import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { OrganizationWrapper } from './lists'

const OrganizationsPage = () => (
    <Routes>
        <Route element={<Outlet />}>
            <Route
                path='index'
                element={
                    <>
                        <PageTitle>Organizations</PageTitle>
                        <OrganizationWrapper />
                    </>
                }
            />
            <Route index element={<Navigate to='/organizations/index' />} />
        </Route>
    </Routes>
)

export default OrganizationsPage
