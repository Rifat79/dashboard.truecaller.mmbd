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
        <AsideMenuItem
          to='/dashboard'
          icon='/media/icons/duotune/art/art002.svg'
          title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
          fontIcon='bi-grid'
        />

    </>
  )
}
