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
import { statusOptions } from '../../../../constants/constants'

const phoneRegExp = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
const websiteRegEx = /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

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
  address: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(500, 'Maximum 50 symbols')
    .required('Address is required'),
  organizationWebsite: Yup.string()
    .matches(websiteRegEx, 'Organizaton website is not valid')
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
    address: user.organizationAddress || initialUser.organizationAddress,
    name: user.organizationName || initialUser.organizationName,
    email: user.organizationEmail || initialUser.organizationEmail,
    mobile: user.organizationMobile || initialUser.organizationMobile,
    statusActive: statusOptions.filter(e => e.id == user.statusActive)[0] || {id: 1, label: 'Active', value: 1},
    organizationLogo: user.organizationLogo || initialUser.organizationLogo,
    organizationWebsite: user.organizationWebsite || initialUser.organizationWebsite,
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

  const handleStatusOptionChange = (selectedOption: any) => {
    formik.setFieldValue('role', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };

  const blankImg = toAbsoluteUrl('/media/avatars/organization_blank.png')
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          const res: any = await updateUser({
            id: values.id,
            statusActive: 1,
            organizationAddress: values.address,
            organizationEmail: values.email,
            organizationLogo: values.organizationLogo,
            organizationMobile: values.mobile,
            organizationName: values.name,
            organizationThumbnail: values.organizationThumbnail,
            organizationWebsite: values.organizationWebsite
          })
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
          const res: any = await createUser({
            statusActive: 1,
            organizationAddress: values.address,
            organizationEmail: values.email,
            organizationLogo: values.organizationLogo,
            organizationMobile: values.mobile,
            organizationName: values.name,
            organizationThumbnail: values.organizationThumbnail,
            organizationWebsite: values.organizationWebsite
          });
          console.log('res: ', res)
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

  // useEffect(() => {
  //   const callAPI =async () => {
  //     const response = await getQueryRequest(GET_ORGANIZATION_LIST);
  //     const responseRole = await getQueryRequest(GET_ROLE_LIST);

  //     const organizationList = reactSelectify(response?.data, 'organizationName'); 
  //     const roleList = reactSelectify(responseRole?.data, 'roleName');

  //     const selectedOrg = organizationList?.filter(e => e.value == user?.organization); 
  //     const selectedRole = roleList?.filter(e => e.value == user?.role?.roleName);


  //     setState({
  //       ...state, 
  //       formData: {
  //         ...state.formData, 
  //         org: [...organizationList], 
  //         role: [...roleList], 
  //     }});
  //     formik.setFieldValue('organization', selectedOrg.length ? selectedOrg[0] : {});
  //     formik.setFieldValue('role', selectedRole.length ? selectedRole[0] : {});
  //     formik.setFieldValue('password', '12345');
  //     formik.setFieldValue('confirmPass', '12345')
  //   }
  //   callAPI();
  // }, []);

  console.log('formik: ', formik.values)

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
              
              
              <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Org. Name</label>
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


          {/* end::Input group */}

          {/* begin::Input group */}

          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="fv-row mb-3">
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

          <div className="fv-row mb-3">
            <label className="fs-6 fw-bold mb-2">Website</label>
            <input
              type="text"
              {...formik.getFieldProps('organizationWebsite')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.organizationWebsite && formik.errors.organizationWebsite },
                {
                  'is-valid': formik.touched.organizationWebsite && !formik.errors.organizationWebsite,
                }
              )}
              placeholder=""
              name="organizationWebsite"
              
            />
            {formik.touched.organizationWebsite && formik.errors.organizationWebsite && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.organizationWebsite}</span>
                      </div>
                  </div>
                )}
          </div>
          <div className="col" data-select2-id="select2-data-5-57fi">
              <div className="fv-row mb-7">
                {/*begin::Label*/}
                <label className="required fs-6 fw-bold form-label mb-2">Status</label>
                {/*end::Label*/}
                {/*begin::Input*/}
                <Select options={statusOptions} onChange={handleStatusOptionChange} value={formik.values.statusActive} name="role"/>
                {/*end::Input*/}
                <label className="fs-6 fw-bold mt-2">Address</label>
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
              
            </div>

          <div className="row">
            <label className='d-block fw-bold fs-6 mb-5'> Logo</label>
            <div className='col-6'>
              <div className='fv-row mb-3'>
                <span className='d-block  fs-6 mb-5'>Size: (220 × 56)</span>
                <CropperComponents
                  className="w-125px h-125px"
                  full=""
                  height={56} width={220}
                  onCroped={(img: any) => formik.setFieldValue('organizationLogo', img)} src={user?.organizationLogo || blankImg} />
              </div>
            </div>
            <div className='col-6'>
              <div className='fv-row mb-3'>
                <label className='d-block fs-6 mb-5'>Size: (400 × 400)</label>
                <CropperComponents
                  className="w-125px h-125px"
                  full=""
                  height={400} width={400}
                  onCroped={(img: any) => formik.setFieldValue('organizationThumbnail', img)} src={user?.organizationThumbnail || blankImg} />
              </div>
            </div>
            
          </div>
          
          {/* <div className="separator separator-dashed mb-3 border-dark" />
          
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
          </div> */}



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
