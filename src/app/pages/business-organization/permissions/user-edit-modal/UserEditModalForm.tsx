import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import CropperComponents from '../../../../modules/helpers/cropper/CropperComponents'
import Select from 'react-select'
import swal from 'sweetalert'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  moduleName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  moduleUrl: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 500 symbols')
    .required('URL is required'),
})

const methodOptions = [
  {id: 0, label: 'POST', value: 0, },
  {id: 1, label: 'GET', value: 1},
  {id: 2, label: 'PUT', value: 2},
  {id: 3, label: 'DELETE', value: 3}
]

const statusOptions = [
  {id: 0, label: 'Active', value: 0},
  {id: 1, label: 'Inactive', value: 1}
]

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const [state, setState] = useState({
    formData: {
      moduleName: '',
      method: methodOptions.filter(e => e.label.toLowerCase() == user?.method?.toLowerCase())[0] ||{id: 1, label: 'GET', value: 1},
      status: statusOptions.filter(e => e.id == user.status)[0] || {id: 0, label: 'Active', value: 0},
      moduleUrl: ''
    }
  });
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    moduleName: user.moduleName || initialUser.moduleName,
    moduleUrl: user.moduleUrl || initialUser.moduleUrl,
    email: user.email || initialUser.email,
    status: statusOptions.filter(e => e.id == user.status)[0] || state.formData.status,
    method: methodOptions.filter(e => e.label.toLowerCase() == user?.method?.toLowerCase())[0] || state.formData.method
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const handleStatusChange = (selectedOption: any) => {
    formik.setFieldValue('status', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleMethodChange = (selectedOption: any) => {
    formik.setFieldValue('method', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const res: any = await updateUser({
            id: values.id,
            moduleName: values.moduleName, 
            moduleUrl: values.moduleUrl,
            status: values?.status?.id,
            method: values?.method?.label
          });
          if(res?.data?.success) {
            cancel(true);
          } else {
            swal({
              title: "Sorry!",
              text: res?.data?.message,
              icon: "error",
            });
          }
        } else {
          const data = {
            moduleName: values.moduleName, 
            moduleUrl: values.moduleUrl,
            status: values?.status?.id,
            method: values?.method?.label
          }
          const res: any = await createUser(data)
          if(res?.data?.success) {
            cancel(true); 
          } else {
            swal({
              title: "Sorry!",
              text: res?.data?.message,
              icon: "error",
            });
          }
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_update_customer_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_update_customer_header'
          data-kt-scroll-wrappers='#kt_modal_update_customer_scroll'
          data-kt-scroll-offset='300px'
          style={{maxHeight: 661}}
        >
          <div id='kt_modal_update_customer_user_info' className='show'>
            <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>Name</label>
              <input 
                type='text' 
                placeholder='Permission Name '
                {...formik.getFieldProps('moduleName')}
                className='form-control' 
                name='moduleName' 
              />
              {formik.touched.moduleName && formik.errors.moduleName && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.moduleName}</span>
                    </div>
                  </div>
                )}
            </div>
            <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>Method</label>
              <Select options={methodOptions} name="method" value={state?.formData?.method} onChange={handleMethodChange} />
            </div>
            <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>URL</label>
              <input 
                type='text' 
                placeholder='URL'
                {...formik.getFieldProps('moduleUrl')}
                className='form-control'
                name='moduleUrl' 
              />
              {formik.touched.moduleUrl && formik.errors.moduleUrl && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.moduleUrl}</span>
                    </div>
                  </div>
                )}
            </div>
            <div className='fv-row mb-7'>
              <label className='required fs-6 fw-bold form-label mb-2'>Status</label>
              <Select options={statusOptions} name="status" value={state?.formData?.status} onChange={handleStatusChange}/>
            </div>
          </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
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

export {UserEditModalForm}
