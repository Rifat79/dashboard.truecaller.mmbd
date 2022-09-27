import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { getAuth } from '../../modules/auth'
import { OrganizationWrapper } from './lists'

const OrganizationsPage = () => {
    const auth = getAuth()
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='index'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Organizations</PageTitle>
                            <OrganizationWrapper />
                        </>
                    }
                />
                <Route index element={<Navigate to='/organizations/index' />} />
            </Route>
        </Routes>
    )
}

export default OrganizationsPage
