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
import { GET_ALL_PERMISSION } from '../../../../constants/api.constants'
import { reactSelectify } from '../../../../modules/helpers/helper'
import swal from 'sweetalert'

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
      permissions: [{}]
    }
  })
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const permissions = user?.modulesList && reactSelectify(user?.modulesList, 'displayName') || [];

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    name: user.roleName || initialUser.roleName,
    email: user.email || initialUser.email,
    modulesList: permissions|| initialUser.modulesList,
    description: user.roleDescription || initialUser.roleDescription
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const handleModuleOptionChange = (selectedOption: any) => {
    formik.setFieldValue('modulesList', selectedOption);
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
            modulesList: values.modulesList,
            roleName: values.name,
            roleDescription: values.description
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
            modulesList: values.modulesList,
            roleName: values.name,
            roleDescription: values.description
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
      const response = await getQueryRequest(GET_ALL_PERMISSION);
      const permissions = reactSelectify(response.data, 'displayName') || []; 
      setState({
        ...state, 
        formData: {
          ...state.formData,
          permissions: [...permissions]
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
            className="d-flex flex-column  me-n7 pe-7"
          >
            <div id="kt_modal_update_customer_user_info" className="show">
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
              <div className="fv-row mb-3">
                <label className="fs-6 fw-bold mb-2">Description</label>
                <input
                  type="text"
                  {...formik.getFieldProps('description')}
                  className="form-control"
                  placeholder=""
                  name="description"
                />
              </div>
              <div className="fv-row mb-7">
                <label className="required fs-6 fw-bold form-label mb-2">
                  Select Permission
                </label>
                <Select isMulti name='modulesList' options={state.formData.permissions} onChange={handleModuleOptionChange} value={formik.values.modulesList}/>
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
