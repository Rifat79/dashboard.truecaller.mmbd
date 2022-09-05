import { FC, useEffect, useState } from 'react'
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
import { getQueryRequest } from '../../../../modules/helpers/api'
import { GET_ORGANIZATION_LIST, GET_ROLE_LIST } from '../../../../constants/api.constants'
import { reactSelectify } from '../../../../modules/helpers/helper'
import swal from 'sweetalert'

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
  password: Yup.string()
    .min(5, 'Password must be of at least 5 characters')
    .required('Password is required'),
  confirmPass: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm the password'),
  address: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(500, 'Maximum 50 symbols')
    .required('Address is required'),
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

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    address: user.address || initialUser.address,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    name: user.name || initialUser.name,
    email: user.email || initialUser.email,
    mobile: user.mobile || initialUser.mobile,
    password: user.password || initialUser.password,
    confirmPass: user.confirmPass || initialUser.confirmPass,
    organization: user.organization || initialUser.organization,
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
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser({
            statusActive: 1,
            address: values.address,
            email: values.email,
            id: values.id,
            image: values.image,
            mobile: values.mobile,
            name: values.name,
            organizationId: values.organization?.id,
            // password: values.password,
            role: values.role
          })
        } else {
          const res: any = await createUser({
            statusActive: 1,
            address: values.address,
            email: values.email,
            id: values.id,
            image: values.image,
            mobile: values.mobile,
            name: values.name,
            organizationId: values.organization?.id,
            password: values.password,
            role: values.role
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
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  }); 

  useEffect(() => {
    const callAPI =async () => {
      const response = await getQueryRequest(GET_ORGANIZATION_LIST);
      const responseRole = await getQueryRequest(GET_ROLE_LIST);

      const organizationList = reactSelectify(response?.data, 'organizationName'); 
      const roleList = reactSelectify(responseRole?.data, 'roleName');

      const selectedOrg = organizationList?.filter(e => e.value == user?.organization); 
      const selectedRole = roleList?.filter(e => e.value == user?.role?.roleName);


      setState({
        ...state, 
        formData: {
          ...state.formData, 
          org: [...organizationList], 
          role: [...roleList], 
      }});
      formik.setFieldValue('organization', selectedOrg.length ? selectedOrg[0] : {});
      formik.setFieldValue('role', selectedRole.length ? selectedRole[0] : {});
      formik.setFieldValue('password', '12345');
      formik.setFieldValue('confirmPass', '12345')
    }
    callAPI();
  }, []);

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
          <div className='row'>
            <div className='col-lg-4'>
              <div className='fv-row mb-3'>
                <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
                <CropperComponents
                  className="w-125px h-125px"
                  full=""
                  height={400} width={400}
                  onCroped={(img: any) => formik.setFieldValue('image', img)} src={user?.image || blankImg} />
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
          <div className="fv-row mb-3">
            <label className="fs-6 fw-bold mb-2">Address</label>
            <input
              type="text"
              {...formik.getFieldProps('address')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.address && formik.errors.address },
                {
                  'is-valid': formik.touched.address && !formik.errors.address,
                }
              )}
              placeholder=""
              name="address"
              
            />
            {formik.touched.address && formik.errors.address && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.address}</span>
                      </div>
                  </div>
                )}
          </div>

          <div className="row">
            <div className="col">
              <label className="fs-6 fw-bold mb-2">Partner</label>
              <Select options={state?.formData?.org}  onChange={handlePartnerOptionChange} value={formik.values.organization} name="organization"/>
            </div>
            <div className="col" data-select2-id="select2-data-5-57fi">
              <div className="fv-row mb-7">
                {/*begin::Label*/}
                <label className="required fs-6 fw-bold form-label mb-2">Role</label>
                {/*end::Label*/}
                {/*begin::Input*/}
                <Select options={state.formData.role} onChange={handleRoleOptionChange} value={formik.values.role} name="role"/>
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
                  {...formik.getFieldProps('mobile')}
                  className={clsx(
                    'form-control form-control-solid',
                    { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
                    {
                      'is-valid': formik.touched.mobile && !formik.errors.mobile,
                    }
                  )}
                  placeholder="01XXXXXXXXX"
                  name="mobile"
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

          <div className="fv-row mb-3">
            <div className="row">
              <div className="col">
                <label className="required fs-6 fw-bold mb-2">Password</label>
                <input
                  {...formik.getFieldProps('password')}
                  type="password"
                  className="form-control form-control-solid"
                  placeholder=""
                  name="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="col">
                <label className="required fs-6 fw-bold mb-2">Confirm Password</label>
                <input
                  {...formik.getFieldProps('confirmPass')}
                  type="password"
                  className="form-control form-control-solid"
                  placeholder=""
                  name="confirmPass"
                />
                {formik.touched.confirmPass && formik.errors.confirmPass && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.confirmPass}</span>
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
