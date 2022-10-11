import {FC, useEffect, useState} from 'react'
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
import { getQueryRequest } from '../../../../modules/helpers/api'
import { GET_ALL_BRAND, GET_ORGANIZATION_LIST } from '../../../../constants/api.constants'
import { getVal, reactSelectify } from '../../../../modules/helpers/helper'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  keyword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  organization: Yup.object()
    .required('Organization is required'),
  subKeyword: Yup.string()
    .min(1, "Minimum 1 symbol")
    .max(5, 'Maximum 5 symbols')
})

const methodOptions = [
  {id: 0, label: 'POST', value: 0, },
  {id: 1, label: 'GET', value: 1},
  {id: 2, label: 'PUT', value: 2},
  {id: 3, label: 'DELETE', value: 3}
]
const deviceTypeOptions = [
  {id: 0, label: 'Smart Phone', value: 'SmartPhone '},
  {id: 1, label: 'Feature Phone', value: 'FeaturePhone'},
  {id: 2, label: 'N/A', value: 'NA'}
]
const statusOptions = [
  {id: 1, label: 'Active', value: 1},
  {id: 0, label: 'Inactive', value: 0}
]

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const [state, setState] = useState({
    formData: {
      status: statusOptions.filter(e => e.id == user.status)[0] || {id: 0, label: 'Active', value: 0},
      organizationList: [{}],
      organizationId: user?.organizationId,
      selectedOrg: {},
      brandList: [{}],
      selectedBrand: {}
    }
  });
  const {setItemIdForUpdate, itemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    status: statusOptions.filter(e => e.id == user.status)[0] || state.formData.status,
    organization: {id: user?.organizationId || initialUser?.organizationId},
    keyword: user?.keyword || initialUser.keyword,
    gameProvider: user?.gameProvider || initialUser?.gameProvider,
    subKeyword: user?.subKeyword || initialUser?.subKeyword,
    deviceType: user?.deviceType || initialUser?.deviceType
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
  const handleOrgChange = (selectedOption: any) => {
    formik.setFieldValue('organization', selectedOption);
    setState({
      ...state,
      formData: {
        ...state.formData,
        organizationId: selectedOption?.id
      }
    })
    // console.log(`Option selected:`, selectedOption);
  };
  const handleDeviceTypeChange = (selectedOption: any) => {
    formik.setFieldValue('deviceType', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleBrandChange = (selectedOption: any) => {
    formik.setFieldValue('brand', selectedOption);
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
        if (isNotEmpty(itemIdForUpdate)) {
          const res: any = await updateUser({
            id: itemIdForUpdate,
            brand: values?.brand?.id, 
            deviceType: values.deviceType?.value,
            gameProvider: values.gameProvider,
            keyword: values.keyword,
            organizationId: values.organization.id,
            status: values?.status?.id,
            subKeyword: values.subKeyword
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
            brand: values?.brand?.id, 
            deviceType: values.deviceType?.value,
            gameProvider: values.gameProvider,
            keyword: values.keyword,
            organizationId: values.organization.id,
            status: values?.status?.id,
            subKeyword: values.subKeyword
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
  });

  useEffect(() => {
    const callAPI = async() => {
      const resOrg: any = await getQueryRequest(GET_ORGANIZATION_LIST);
      const orgList: any = reactSelectify(resOrg?.data, 'organizationName') || []; console.log('org: ', orgList)
      const org = getVal(orgList, 'id', user?.organizationId);
      formik.setFieldValue('organization', org);
      const deviceType = deviceTypeOptions.filter(e => e.label == user?.deviceType)[0] || deviceTypeOptions[1];
      formik.setFieldValue('deviceType', deviceType);
      const status = statusOptions.filter(e => e.value == user.status)[0] || statusOptions[0];
      formik.setFieldValue('status', status)
      setState({
        ...state,
        formData: {
          ...state.formData,
          organizationList: orgList,
          selectedOrg: org
        }
      });
      
    };
    callAPI();
  }, []);

  useEffect(() => {
    const callAPI = async() => {
      const res = await getQueryRequest(`${GET_ALL_BRAND}?organization=${state?.formData?.organizationId}`);
      if(res?.success) {
        const brandList = reactSelectify(res?.data, 'brandName') || [];
        const brand = getVal(brandList, 'brandName', user?.brand); 
        formik.setFieldValue('brand', brand)
        setState({
          ...state,
          formData: {
            ...state.formData,
            brandList: brandList,
          }
        });
      } else {
        // setState({
        //   ...state,
        //   formData: {
        //     ...state.formData,
        //     brandList: [{}],
        //     selectedOrg: {}
        //   }
        // });
      }
    };
    callAPI();
  }, [state.formData.organizationId]);

  console.log('values: ', formik.values)
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
          <div id='kt_modal_update_customer_user_info' className='show row row-cols-1 row-cols-sm-2 row-cols-lg-2 gy-4'>
            <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>Organization</label>
              <Select options={state.formData.organizationList} name="organization" value={formik.values.organization} onChange={handleOrgChange}/>
            </div>
            <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>KeyWord</label>
              <input 
                type='text' 
                placeholder='Keyword'
                {...formik.getFieldProps('keyword')}
                className='form-control' 
                name='keyword' 
              />
              {formik.touched.keyword && formik.errors.keyword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.keyword}</span>
                    </div>
                  </div>
                )}
            </div>
            <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>Device Type</label>
              <Select options={deviceTypeOptions} name="deviceType" value={formik.values.deviceType} onChange={handleDeviceTypeChange}/>
            </div>
            <div className='fv-row mb-3'>
              <label className=' fs-6 fw-bold mb-2'>Sub KeyWord</label>
              <input 
                type='text' 
                placeholder='Sub Keyword'
                {...formik.getFieldProps('subKeyword')}
                className='form-control' 
                name='subKeyword' 
              />
              {formik.touched.subKeyword && formik.errors.subKeyword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.subKeyword}</span>
                    </div>
                  </div>
                )}
            </div>
            <div className='fv-row mb-3'>
              <label className='fs-6 fw-bold mb-2'>Brand</label>
              <Select options={state.formData.brandList} name="brand" value={formik.values.brand} onChange={handleBrandChange}/>
            </div>
            {/* <div className='fv-row mb-3'>
              <label className='required fs-6 fw-bold mb-2'>Method</label>
              <Select options={methodOptions} name="method" value={state?.formData?.method} onChange={handleOrgChange} />
            </div> */}
            <div className='fv-row mb-3'>
              <label className=' fs-6 fw-bold mb-2'>Game Provider</label>
              <input 
                type='text' 
                placeholder='Game Provider'
                {...formik.getFieldProps('gameProvider')}
                className='form-control'
                name='gameProvider' 
              />
            </div>
            <div className='fv-row mb-7'>
              <label className=' fs-6 fw-bold form-label mb-2'>Status</label>
              <Select options={statusOptions} name="status" value={formik.values.status} onChange={handleStatusChange}/>
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
