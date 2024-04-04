import {Suspense, useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {authApi} from '../_metronic/redux/slices/auth'
import {useAppDispatch} from '../_metronic/redux/store'
import {AuthInit, useAuth} from './modules/auth'

const App = () => {
  const [loading, setLoading] = useState(true)

  const {currentUser, logout} = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userPartitions = async () => {
      if (!currentUser) {
        const res = await dispatch(
          authApi.endpoints.getUserPermissions.initiate(undefined)
        ).unwrap()
        setLoading(false)
        if (res && !res?.success && (res.status_code === 601 || res.status_code === 602)) {
          console.log(res)
          logout()
        }
      }
    }
    userPartitions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <Suspense fallback={<LayoutSplashScreen visible={!loading} />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
