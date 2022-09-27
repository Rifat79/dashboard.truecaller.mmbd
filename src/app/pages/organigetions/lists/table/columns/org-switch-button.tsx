/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import { getAuth, setAuth } from '../../../../../modules/auth'
import { updateUser } from '../../../../users/userlist/core/_requests'
import {User} from '../../core/_models'

type Props = {
  user: User
}

const SwitchButtonCell: FC<Props> = ({user}) => {
  const auth = getAuth(); 
  const navigate = useNavigate()
  const switchOrg = async() => {
    const res: any = await updateUser({
      ...auth?.user, organizationId: user?.id
    });
    console.log('res: ', res)
    if(res?.success || res?.status == 200) {
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          organization: user?.id,
          organizationName: res?.data?.data?.organization,
          organizationUrl: res?.data?.data?.organizationUrl
        }
      })
      navigate('/')
      window.location.reload()
    } else {
      swal({
        title: "Sorry!",
        text: res?.data?.message,
        icon: "error",
      });
    }
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