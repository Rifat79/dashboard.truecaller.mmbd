/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {useSelector} from 'react-redux'
import {useAuth} from '../../../../app/modules/auth'
import {Can} from '../../../redux/ability'
import {RootState} from '../../../redux/store'
import {AsideMenuItem} from './AsideMenuItem'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'

const menuItems = [
  {
    menu_name: 'Dashboard',
    icon: '/media/icons/duotune/art/art002.svg',
    icon_select: '/media/icons/duotune/art/art002.svg',
    icon_type: 'svg',
    route: '/dashboard',
  },
  {
    menu_name: 'Reports',
    icon: '/media/icons/duotune/art/art002.svg',
    icon_select: '/media/icons/duotune/art/art002.svg',
    icon_type: 'svg',
    route: '/reports',
  },
]

export function AsideMenuMain() {
  const intl = useIntl()

  const response = useSelector(
    (state: RootState) => state.api.queries['getUserPermissions(undefined)']
  )

  const {data}: any = response || {}
  const {data: userPermission} = data || []
  const {auth} = useAuth()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={'Dashboard'}
        fontIcon='bi-grid'
      />
      {userPermission &&
        userPermission.length > 0 &&
        userPermission.map((menu: any, i: any) => {
          const menuItem = menuItems.find((f) => f.route === menu?.group_route)
          return (
            menuItem &&
            (menuItem.route.includes('reports') ? (
              <AsideMenuItemWithSub
                to='/reports'
                icon='/media/icons/duotune/art/art005.svg'
                title='Reports'
                hasBullet={false}
              >
                <Can access='Truecaller Reports' group={'reports'}>
                  <AsideMenuItem
                    to={'/reports/charge-histories'}
                    title={`Truecaller Charge Histories`}
                    hasBullet={true}
                  />
                </Can>
                <Can access='BT Report' group={'reports'}>
                  <AsideMenuItem to={'/reports/bts'} title={'BedtimeStories'} hasBullet={true} />
                </Can>
              </AsideMenuItemWithSub>
            ) : (
              <></>
            ))
          )
        })}
      {auth?.user?.role_id_string?.includes('1') && (
        <AsideMenuItemWithSub
          to={'/users'}
          title={'Users'}
          fontIcon='bi-chat-left'
          icon={'/media/icons/duotune/art/art009.svg'}
        >
          <Can access='User list' group='users'>
            <AsideMenuItem to={'/users/index'} title={'Manage User'} hasBullet={true} />
          </Can>

          <Can access='Permissions List' group='users'>
            <AsideMenuItem to={'/users/permissions'} title={'Permissions'} hasBullet={true} />
          </Can>

          <Can access='Roles List' group='users'>
            <AsideMenuItem to={'/users/roles'} title={'Roles'} hasBullet={true} />
          </Can>
        </AsideMenuItemWithSub>
      )}
    </>
  )
}
