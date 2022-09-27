import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { getAuth } from '../../modules/auth'
import { PermissionsWrapper } from './permissions'
import { RolesWrapper } from './roles'
import { UsersWrapper } from './userlist'

const UsersPage = () => {
    const auth = getAuth()
    return(
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='index'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Users</PageTitle>
                            <UsersWrapper />
                        </>
                    }
                />
                <Route
                    path='roles'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Roles</PageTitle>
                            <RolesWrapper />
                        </>
                    }
                />
                <Route
                    path='permission'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Permissions</PageTitle>
                            <PermissionsWrapper />
                        </>
                    }
                />
                <Route index element={<Navigate to='/users/index' />} />
            </Route>
        </Routes>
    )
}

export default UsersPage
