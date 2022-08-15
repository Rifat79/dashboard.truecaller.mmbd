/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-grid'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>ADMINISTRATION</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/users'
        title='Admin'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/users/index' title='Users' hasBullet={true} />
        <AsideMenuItem to='/users/roles' title='Roles' hasBullet={true} />
        <AsideMenuItem to='/users/permission' title='Permission' hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItem
        to='/organizations'
        icon='/media/icons/duotune/art/art002.svg'
        title='Organizations'
        fontIcon='bi-building'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>ACTIVATION REPORTS</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/activation'
        title='Device Activation'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-device-ssd'
      >
        <AsideMenuItem to='/activation/dashboard' title='Dashboard' hasBullet={true} />
        <AsideMenuItemWithSub to='/activation/reports' title='Reports' hasBullet={true}>
          <AsideMenuItem to='/activation/overview' title='Activation Details' hasBullet={true} />
          <AsideMenuItem to='/activation/model-wize' title='Model Wize' hasBullet={true} />
          <AsideMenuItem to='/activation/downloads' title='Downloads' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>REVENUE REPORTS</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/revenue'
        title='Game Revenue'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-controller'
      >
        <AsideMenuItem to='/revenue/dashboard' title='Dashboard' hasBullet={true} />
        <AsideMenuItemWithSub to='/revenue/reports' title='Revenue Reports' hasBullet={true}>
          <AsideMenuItem to='/revenue/overview' title='Summary' hasBullet={true} />
          <AsideMenuItem to='/revenue/model-wize' title='Model Wize' hasBullet={true} />
          <AsideMenuItem to='/revenue/details' title='Details' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <AsideMenuItemWithSub
        to='/pushpull'
        title='Push-Pull Revenue'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-headset-vr'
      >
        <AsideMenuItem to='/pushpull/dashboard' title='Dashboard' hasBullet={true} />
        <AsideMenuItemWithSub to='/pushpull/reports' title='Revenue Reports' hasBullet={true}>
          <AsideMenuItem to='/pushpull/overview' title='Summary' hasBullet={true} />
          <AsideMenuItem to='/pushpull/details' title='Details' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>INVOICE & PAYOUT</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/invoice'
        title='Invoice & Payout'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-bar-chart'
      >
        <AsideMenuItem to='/invoice/dashboard' title='Dashboard' hasBullet={true} />
        <AsideMenuItem to='/invoice/lists' title='Invoice Lists' hasBullet={true} />
        <AsideMenuItem to='/invoice/payout' title='Payout Details' hasBullet={true} />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>CONFIGURATION</span>
        </div>
      </div>

      <AsideMenuItemWithSub
        to='/configuration'
        title='Configurations'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-bar-chart'
      >
        <AsideMenuItem to='/configuration/keyword' title='Game Keyword' hasBullet={true} />
        <AsideMenuItem to='/configuration/revenue' title='Revenue' hasBullet={true} />
      </AsideMenuItemWithSub>

    </>
  )
}
