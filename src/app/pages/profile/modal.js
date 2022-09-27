import {useFormik} from 'formik'
import CropperComponents from '../../modules/helpers/cropper/CropperComponents'
import clsx from 'clsx'
import * as Yup from 'yup'
import {getAuth} from '../../modules/auth'
import { phoneRegExp } from '../../constants/constants'
import { updateUser } from '../users/userlist/core/_requests'
import swal from 'sweetalert'

export default function EditProfile () {
  const auth = getAuth();
  const user = {
    id: auth?.user?.id,
    name: auth?.user?.name,
    mobile: auth?.user?.mobile,
    email: auth?.user?.email,
    address: auth?.user?.address,
    image: auth?.user?.image,
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email is required'),
    name: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Name is required'),
    mobile: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone no. is required'),
    address: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(500, 'Maximum 50 symbols')
      .required('Address is required'),
  })

  const formik = useFormik({
    initialValues: user,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
              const res =  await updateUser({
                statusActive: 1,
                address: values.address,
                email: values.email,
                id: values.id,
                image: values.image,
                mobile: values.mobile,
                name: values.name,
                organizationId: auth?.user?.organization,
                role: auth?.user?.role
              });
              if(res?.data?.success) {
                // cancel(true);
              } else {
                swal({
                  title: "Sorry!",
                  text: res?.data?.message,
                  icon: "error",
                });
              }
          } catch (ex) {
            console.error(ex)
          } finally {
            setSubmitting(true)
            // cancel(true)
          }
    }
  })

  
  const isSubmitting = false
  const isUserLoading = false
  return (
    <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit}>
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
                className='w-125px h-125px'
                full=''
                height={400}
                width={400}
                onCroped={(img) => formik.setFieldValue('image', img)}
                src={user?.image}
              />
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
                  {'is-invalid': formik.touched.name && formik.errors.name},
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
                  {'is-invalid': formik.touched.email && formik.errors.email},
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
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
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
        <div className='fv-row mb-3'>
          <label className='fs-6 fw-bold mb-2'>Address</label>
          <input
            type='text'
            {...formik.getFieldProps('address')}
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.address && formik.errors.address},
              {
                'is-valid': formik.touched.address && !formik.errors.address,
              }
            )}
            placeholder=''
            name='address'
          />
          {formik.touched.address && formik.errors.address && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.address}</span>
              </div>
            </div>
          )}
        </div>

        <div className='separator separator-dashed mb-3 border-dark' />

        <div className='fv-row mb-3'>
          <div className='row'>
            <div className='col'>
              <label className='required fs-6 fw-bold mb-2'>
                <span>Phone</span>
                <i
                  className='fas fa-exclamation-circle ms-1 fs-7'
                  data-bs-toggle='tooltip'
                  title=''
                  data-bs-original-title='Email address must be active'
                  aria-label='Email address must be active'
                />
              </label>
              <input
                type='phone'
                {...formik.getFieldProps('mobile')}
                className={clsx(
                  'form-control form-control-solid',
                  {'is-invalid': formik.touched.mobile && formik.errors.mobile},
                  {
                    'is-valid': formik.touched.mobile && !formik.errors.mobile,
                  }
                )}
                placeholder='01XXXXXXXXX'
                name='mobile'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.mobile}</span>
                  </div>
                </div>
              )}
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
          // onClick={() => cancel()}
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
    //   {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
  )
}
