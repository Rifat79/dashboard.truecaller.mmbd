import clsx from 'clsx'
import { KTSVG } from '../../../helpers'
import { ThemeModeType, useThemeMode } from './ThemeModeProvider'

/* eslint-disable jsx-a11y/anchor-is-valid */
type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'svg-icon-2'
}: Props) => {
  const { mode, updateMode, updateMenuMode } = useThemeMode()
  const switchMode = (_mode: ThemeModeType) => {
    updateMenuMode(_mode)
    updateMode(_mode)
  }

  return (
    <>
      {/* begin::Menu toggle */}
      <button
        onClick={() => switchMode(mode === 'dark' ?'light': 'dark')}
        className={clsx('btn btn-icon ', toggleBtnClass)}
      >
        {mode === 'dark' && (
          <KTSVG
            path='/media/icons/duotune/general/gen061.svg'
            className={clsx('theme-light-hide', toggleBtnIconClass)}
          />
        )}

        {mode === 'light' && (
          <KTSVG
            path='/media/icons/duotune/general/gen060.svg'
            className={clsx('theme-dark-hide', toggleBtnIconClass)}
          />
        )}
      </button>
      {/* begin::Menu toggle */}
    </>
  )
}

export { ThemeModeSwitcher }
