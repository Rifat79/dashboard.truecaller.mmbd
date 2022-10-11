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
import { GET_ALL_PERMISSION, GET_ORGANIZATION_LIST } from '../../../../constants/api.constants'
import { reactSelectify } from '../../../../modules/helpers/helper'
import swal from 'sweetalert'
import { statusOptions } from '../../../../constants/constants'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Role name is required'),
})

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => { 
  const [state, setState] = useState({
    formData: {
      organizations: [{}]
    }
  })
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    name: user.brandName || initialUser.brandName,
    status: statusOptions.filter(e => e.id == user.status)[0]|| {id: 1, label: 'Active', value: 1},
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const handleOrganizationOptionChange = (selectedOption: any) => {
    formik.setFieldValue('organization', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };
  const handleStatusOptionChange = (selectedOption: any) => {
    formik.setFieldValue('status', selectedOption);
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
          const res: any = await updateUser({
            id: values.id,
            brandName: values.name,
            organizationId: values.organization?.id,
            status: values.status?.id
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
          const res: any = await createUser({
            brandName: values.name,
            organizationId: values.organization?.id,
            status: values.status?.id
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
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  useEffect(() => {
    const callAPI = async() => {
      const response = await getQueryRequest(GET_ORGANIZATION_LIST);
      const orgList = reactSelectify(response.data, 'organizationName') || []; 
      const org = orgList.filter(e => e.value == user.organization)[0] || {};
      formik.setFieldValue('organization', org);
      setState({
        ...state, 
        formData: {
          ...state.formData,
          organizations: [...orgList]
        }
      })
    };

    callAPI();
  }, [])

  return (
    <>
      <form className="form" action="#" id="kt_modal_update_customer_form" onSubmit={formik.handleSubmit}>
        <div className="modal-body">
          <div
            className="d-flex flex-column scroll-y me-n7 pe-7"
            id="kt_modal_update_customer_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_update_customer_header"
            data-kt-scroll-wrappers="#kt_modal_update_customer_scroll"
            data-kt-scroll-offset="300px"
            style={{ maxHeight: 661 }}
          >
            <div id="kt_modal_update_customer_user_info" className="show">
              <div className="fv-row mb-3">
                <label className="required fs-6 fw-bold form-label mb-2">
                  Select Organization
                </label>
                <Select name='organization' options={state.formData.organizations} onChange={handleOrganizationOptionChange} value={formik.values.organization}/>
              </div>
              <div className="fv-row mb-3">
                <label className="required fs-6 fw-bold mb-2">Name</label>
                <input
                  type="text"
                  {...formik.getFieldProps('name')}
                  className="form-control"
                  placeholder="Name"
                  name="name"
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
              <div className="fv-row mb-7">
                <label className="required fs-6 fw-bold form-label mb-2">
                  Status
                </label>
                <Select name='organization' options={statusOptions} onChange={handleStatusOptionChange} value={formik.values.status}/>
              </div>
              
            </div>
          </div>
        </div>
        <div className="modal-footer flex-center py-2">
          <button
            type="reset"
            id="kt_modal_update_customer_cancel"
            className="btn btn-light me-3 btn-sm"
          >
            Reset
          </button>
          <button
            type="submit"
            id="kt_modal_update_customer_submit"
            className="btn btn-primary btn-sm"
          >
            <span className="indicator-label">Submit</span>
            <span className="indicator-progress">
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export { UserEditModalForm }
