import React from 'react'
import {useLayout} from '../../core/LayoutProvider'
import {Toolbar} from './Toolbar'

const Toolbar1 = () => {
  const {config} = useLayout()

  switch (config.toolbar.layout) {
    case 'toolbar1':
      return <Toolbar />

    default:
      return <Toolbar />
  }
}

export {Toolbar1}
