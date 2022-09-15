/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import { getAuth, setAuth } from '../../../../../modules/auth'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const SwitchButtonCell: FC<Props> = ({user}) => {
  const auth = getAuth(); 
  const navigate = useNavigate()
  const switchOrg = () => {
    setAuth({
      ...auth,
      user: {
        ...auth.user,
        organization: user?.id
      }
    })
    navigate('/')
    window.location.reload()
  }

  return (
    <a
      href='#'
      className='btn btn-icon btn-light-primary btn-active-light-primary w-30px h-30px me-3'
      data-kt-docs-table-filter='edit_row'
      onClick={switchOrg}
    >
      <i className='fas fa-sign-in-alt fs-6'></i>
    </a>
  )
}

export {SwitchButtonCell}
