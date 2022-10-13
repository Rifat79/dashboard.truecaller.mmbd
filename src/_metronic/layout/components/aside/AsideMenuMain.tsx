/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { getAuth } from '../../../../app/modules/auth'
import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

export function AsideMenuMain() {
  const intl = useIntl()
  const auth = getAuth();
  const permissions = auth?.user?.permissions || {};

  return (
    <>
      {permissions?.dashboard?.items?.length > 0 && (
          <AsideMenuItem
          to='/dashboard'
          icon='/media/icons/duotune/art/art002.svg'
          title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
          fontIcon='bi-grid'
        />
      )}

      {/* // routes for user */}
      {permissions?.admin?.items?.length > 0 && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-2 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>ADMINISTRATION</span>
            </div>
          </div>

          <AsideMenuItemWithSub
            to='/users'
            title='Admin'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-person'
          > 
            {permissions?.admin?.items?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
            ))}
            {/* <AsideMenuItem to='/users/index' title='Users' hasBullet={true} />
            <AsideMenuItem to='/users/roles' title='Roles' hasBullet={true} />
            <AsideMenuItem to='/users/permission' title='Permission' hasBullet={true} /> */}
          </AsideMenuItemWithSub>
        </>
      )}

      {/* //routes for organization */}
      {permissions?.organization?.items?.length > 0 && (
          <AsideMenuItem
            to={permissions?.organization?.items[0]?.path}
            icon='/media/icons/duotune/art/art002.svg'
            title={permissions?.organization?.items[0]?.title}
            fontIcon='bi-building'
        />
      )}
      
      {/* //routes for device activation */}
      {(permissions?.device_activation?.items?.length > 0 || permissions?.device_activation?.reports?.length > 0) && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-2 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>ACTIVATION REPORTS</span>
            </div>
          </div>

          <AsideMenuItemWithSub
            to='/activation'
            title='Device Activation'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-device-ssd'
          >
            {permissions?.device_activation?.items?.length > 0 && permissions?.device_activation?.items?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
            ))}
            <AsideMenuItemWithSub to='/activation/reports' title='Reports' hasBullet={true}>
              {permissions?.device_activation?.reports?.length > 0 && permissions?.device_activation?.reports?.map((item: any, indx: any) => (
                <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
              ))}
            </AsideMenuItemWithSub>
          </AsideMenuItemWithSub>
        </>
      )}

      {(permissions?.game_revenue?.items?.length > 0 || permissions?.game_revenue?.reports?.length > 0) && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-2 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>REVENUE REPORTS</span>
            </div>
          </div>

          <AsideMenuItemWithSub
            to='/revenue'
            title='Game Revenue'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-controller'
          >
            {permissions?.game_revenue?.items?.length > 0 && permissions?.game_revenue?.items?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
            ))}
            <AsideMenuItemWithSub to='/revenue/reports' title='Revenue Reports' hasBullet={true}>
              {permissions?.game_revenue?.reports?.length > 0 && permissions?.game_revenue?.reports?.map((item: any, indx: any) => (
                <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
              ))}
            </AsideMenuItemWithSub>
          </AsideMenuItemWithSub>
        </>
      )}

      {(permissions?.pushpull_revenue?.items?.length > 0 || permissions?.pushpull_revenue?.reports?.length > 0) && (
        <AsideMenuItemWithSub
        to='/pushpull'
        title='Push-Pull Revenue'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-headset-vr'
      >
        {permissions?.pushpull_revenue?.items?.length > 0 && permissions?.pushpull_revenue?.items?.map((item: any, indx: any) => (
            <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
        ))}
        <AsideMenuItemWithSub to='/pushpull/reports/index' title='Revenue Reports' hasBullet={true}>
          {permissions?.pushpull_revenue?.reports?.length > 0 && permissions?.pushpull_revenue?.reports?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
          ))}
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      )}

      {permissions?.invoice_payout?.items?.length > 0 && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-2 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>INVOICE & PAYOUT</span>
            </div>
          </div>

          <AsideMenuItemWithSub
            to='/invoice'
            title='Invoice & Payout'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-bar-chart'
          >
            {permissions?.invoice_payout?.reports?.length > 0 && permissions?.invoice_payout?.reports?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
            ))}
          </AsideMenuItemWithSub>
        </>
      )}

      {permissions?.organizations_management?.items?.length > 0 && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-2 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Business Organization</span>
            </div>
          </div>

          <AsideMenuItemWithSub
            to='/business-organizations'
            title='Organization Management'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-bar-chart'
          >
            {permissions?.organizations_management?.items?.length > 0 && permissions?.organizations_management?.items?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
            ))}
          </AsideMenuItemWithSub>
        </>
      )}

      {permissions?.configurations?.items?.length > 0 && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-2 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>CONFIGURATION</span>
            </div>
          </div>

          <AsideMenuItemWithSub
            to='/configuration'
            title='Configurations'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-bar-chart'
          >
            {permissions?.configurations?.items?.length > 0 && permissions?.configurations?.items?.map((item: any, indx: any) => (
              <AsideMenuItem to={item?.path} title={item?.title} hasBullet={true} key={indx}/>
            ))}
          </AsideMenuItemWithSub>
        </>
      )}

    </>
  )
}
