import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { PermissionsWrapper } from './permissions'
import { RolesWrapper } from './roles'
import { UsersWrapper } from './userlist'

const UsersPage = () => (
    <Routes>
        <Route element={<Outlet />}>
            <Route
                path='index'
                element={
                    <>
                        <PageTitle>Users</PageTitle>
                        <UsersWrapper />
                    </>
                }
            />
            <Route
                path='roles'
                element={
                    <>
                        <PageTitle>Roles</PageTitle>
                        <RolesWrapper />
                    </>
                }
            />
            <Route
                path='permission'
                element={
                    <>
                        <PageTitle>Permissions</PageTitle>
                        <PermissionsWrapper />
                    </>
                }
            />
            <Route index element={<Navigate to='/users/index' />} />
        </Route>
    </Routes>
)

export default UsersPage
