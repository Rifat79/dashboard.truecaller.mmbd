import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { getAuth } from '../../modules/auth'
import { GameKeywordsWrapper } from './game keywords'
import { RevenueListWrapper } from './revenue'
import { PushpullKeywordsWrapper } from './pushpull keywords'

const ConfigurationPage = () => {
    const auth = getAuth()
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='keyword'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Game Keywords</PageTitle>
                            <GameKeywordsWrapper />
                        </>
                    }
                />
                <Route
                    path='revenue'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Revenue</PageTitle>
                            <RevenueListWrapper />
                        </>
                    }
                />
                <Route
                    path='push-pull-keyword'
                    element={
                        <>
                            <PageTitle description={auth?.user?.organizationName || ''}>Pushpull Keywords</PageTitle>
                            <PushpullKeywordsWrapper />
                        </>
                    }
                />
                <Route index element={<Navigate to='/users/index' />} />
            </Route>
        </Routes>
    )
}
export default ConfigurationPage
