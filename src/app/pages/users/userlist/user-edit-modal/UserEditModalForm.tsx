import { FC, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { initialUser, User } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { createUser, updateUser } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { isNotEmpty, toAbsoluteUrl } from '../../../../../_metronic/helpers'
import CropperComponents from '../../../../modules/helpers/cropper/CropperComponents'
import Select from 'react-select'

const options = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
]

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    name: user.name || initialUser.name,
    email: user.email || initialUser.email,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createUser(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
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
          <div className='row'>
            <div className='col-lg-4'>
              <div className='fv-row mb-3'>
                <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
                <CropperComponents
                  className="w-125px h-125px"
                  full=""
                  height={400} width={400}
                  onCroped={(img: any) => formik.setFieldValue('account.avatar', img[0])} src={blankImg} />
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Full Name</label>
                <input
                  placeholder='Full name'
                  {...formik.getFieldProps('name')}
                  type='text'
                  name='name'
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': formik.touched.name && formik.errors.name },
                    {
                      'is-valid': formik.touched.name && !formik.errors.name,
                    }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.name}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* END */}
              <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Email</label>
                <input
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': formik.touched.email && formik.errors.email },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                  type='email'
                  name='email'
                  autoComplete='off'
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                )}
              </div>
              {/* END */}
            </div>
          </div>


          {/* end::Input group */}

          {/* begin::Input group */}

          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="fv-row mb-3">
            <label className="fs-6 fw-bold mb-2">Address</label>
            <input
              type="text"
              className="form-control form-control-solid"
              placeholder=""
              name="description"
            />
          </div>

          <div className="row">
            <div className="col">
              <label className="fs-6 fw-bold mb-2">Partner</label>
              <input
                type="text"
                className="form-control form-control-solid"
                placeholder=""
                name="description"
              />
            </div>
            <div className="col" data-select2-id="select2-data-5-57fi">
              <div className="fv-row mb-7">
                {/*begin::Label*/}
                <label className="required fs-6 fw-bold form-label mb-2">Role</label>
                {/*end::Label*/}
                {/*begin::Input*/}
                <Select options={options}/>
                {/*end::Input*/}
              </div>
            </div>
          </div>
          
          <div className="separator separator-dashed mb-3 border-dark" />
          
          <div className="fv-row mb-3">
            <div className="row">
              <div className="col">
                <label className="required fs-6 fw-bold mb-2">
                  <span>Phone</span>
                  <i
                    className="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title=""
                    data-bs-original-title="Email address must be active"
                    aria-label="Email address must be active"
                  />
                </label>
                <input
                  type="phone"
                  className="form-control form-control-solid"
                  placeholder="01XXXXXXXXX"
                  name="phone"
                />
              </div>
            </div>
          </div>

          <div className="fv-row mb-3">
            <div className="row">
              <div className="col">
                <label className="required fs-6 fw-bold mb-2">Password</label>
                <input
                  type="password"
                  className="form-control form-control-solid"
                  placeholder=""
                  name="pass"
                />
              </div>
              <div className="col">
                <label className="required fs-6 fw-bold mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-solid"
                  placeholder=""
                  name="pass"
                />
              </div>
            </div>
          </div>



          {/* end::Input group */}
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

export { UserEditModalForm }
