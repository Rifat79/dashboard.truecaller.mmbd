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
      <form className="form" action="#" id="kt_modal_update_customer_form">
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
                <label className="fs-6 fw-bold mb-2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="Name"
                />
              </div>
              <div className="fv-row mb-3">
                <label className="fs-6 fw-bold mb-2">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="Slug"
                />
              </div>
              <div className="fv-row mb-7">
                <label className="required fs-6 fw-bold form-label mb-2">
                  Select Permission
                </label>
                <Select />
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
