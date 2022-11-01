import { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { initialUser, User } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { createUser, updateUser } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { isNotEmpty, toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import CropperComponents from '../../../../../modules/helpers/cropper/CropperComponents'
import Select from 'react-select'
import { getQueryRequest } from '../../../../../modules/helpers/api'
import { GET_ORGANIZATION_LIST, GET_ROLE_LIST, REQUEST_DOWNLOAD } from '../../../../../constants/api.constants'
import { reactSelectify } from '../../../../../modules/helpers/helper'
import swal from 'sweetalert'
import DateRange2 from '../../../../../../_metronic/partials/custom-modules/date-range'
import DateRange from './DateRange'

const phoneRegExp = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

const options = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
]

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  
})

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const [state, setState] = useState({
    formData: {
      org: [{}],
      role: [{}],
      selectedOrg: {},
      selectedRole: {}
    }
  });
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()
  const [date, setDate] = useState<any>(null)

  const [userForEdit] = useState<User>({
    ...user,
    startDate: '',
    endDate: ''
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const handlePartnerOptionChange = (selectedOption: any) => {
    formik.setFieldValue('organization', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };

  const handleRoleOptionChange = (selectedOption: any) => {
    formik.setFieldValue('role', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('clicked...')
      setSubmitting(true)
      try {
        // if (isNotEmpty(values.id)) {
        //   const res: any =  await updateUser({
        //     statusActive: 1,
        //     address: values.address,
        //     email: values.email,
        //     id: values.id,
        //     image: values.image,
        //     mobile: values.mobile,
        //     name: values.name,
        //     organizationId: values.organization?.id,
        //     // password: values.password,
        //     role: values.role
        //   })
        //   if(res?.data?.success) {
        //     cancel(true);
        //   } else {
        //     swal({
        //       title: "Sorry!",
        //       text: res?.data?.message,
        //       icon: "error",
        //     });
        //   }
        // } else {
          const res: any = await getQueryRequest(`${REQUEST_DOWNLOAD}?filter_start_date=${date?.start_date} 00:00:00&filter_end_date=${date?.end_date} 23:59:59`);
          if(res?.success) {
            refetch();
            cancel(true);
          } else {
            swal({
              title: "Sorry!",
              text: res?.message,
              icon: "error",
            });
          }
        // }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  }); 
console.log('formik: ', formik)

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} >
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >


          <div className=' position-relative' id='date-range-ref'>
            <label className='form-label fs-6 fw-bold'>Select Range:</label>
              {/* <DateRange callBack={(e: any) => setDate(e)}/> */}
              <DateRange  startDate={''} endDate={''}   callBack={(e: any) => setDate(e)}/>
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export { UserEditModalForm }
