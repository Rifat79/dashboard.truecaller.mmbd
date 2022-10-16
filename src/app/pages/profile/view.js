import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {getAuth, useAuth} from '../../modules/auth'
import {useState, useEffect} from 'react'
import {getQueryRequest, queryRequest} from '../../modules/helpers/api'
import {CHANGE_PASSWORD, GET_ORGANIZATION_LIST, GET_ROLE_LIST} from '../../constants/api.constants'
import {reactSelectify} from '../../modules/helpers/helper'
import Select from 'react-select'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import swal from 'sweetalert'
import EditProfile from './modal'

export default function ProfileView () {
  const auth = getAuth()
  const currentUser = auth?.user
  const [infoModal, setInfoModal] = useState(false)
  const [editPass, setEditPass] = useState(false)

  const isUserLoading = false

  const schema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, 'Password must be of at least 6 characters')
      .required('Password is required'),
    password: Yup.string()
      .min(6, 'Password must be of at least 6 characters')
      .notOneOf([Yup.ref('oldPassword'), null], 'existing password can not be a new password')
      .required('Password is required'),
    confirmPass: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm the password'),
  })

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const res = await queryRequest(CHANGE_PASSWORD, {
          id: currentUser?.id,
          email: currentUser?.email,
          newPassword: values?.password,
          oldPassword: values?.oldPassword,
        })
        if (res?.success) {
          setEditPass(false)
          formik.setFieldValue('oldPassword', '')
          formik.setFieldValue('password', '')
          formik.setFieldValue('confirmPass', '')

          swal({
            title: 'Success!',
            text: res?.message,
            icon: 'success',
          })
        } else {
          swal({
            title: 'Error!',
            text: res?.message,
            icon: 'error',
          })
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
    <div className='d-flex flex-column flex-xl-row'>
      <div className='flex-column flex-lg-row-auto w-100 w-xl-350px mb-10'>
        <div className='card mb-5 mb-xl-8'>
          <div className='card-body pt-15 position-relative'>
            <button
              onClick={() => setInfoModal(true)}
              className='btn btn-sm btn-icon btn-light-primary w-25px h-25px position-absolute top-0 end-0 me-4 mt-4'
            >
              <i className='fas fa-pencil-alt fs-4'></i>
            </button>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-100px symbol-circle mb-7'>
                <img
                  src={currentUser?.image || toAbsoluteUrl('/media/avatars/blank.png')}
                  alt='image'
                />
              </div>
              <a href='#' className='fs-3 text-gray-800 text-hover-primary fw-bolder mb-1'>
                {currentUser?.name}
              </a>
              {/* <div className="fs-5 fw-bold text-muted mb-6">{currentUser?.shop_generel_info.business_name}</div> */}
              {/* <div className="d-flex flex-wrap flex-center">
                                <div
                                    className="border border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                                    <div className="fs-4 fw-bolder text-gray-700">
                                        <span className="w-75px">6,900</span>
                                        <KTSVG path='/media/icons/duotune/arrows/arr066.svg' className='svg-icon-2 svg-icon-success' />
                                    </div>
                                    <div className="fw-bold text-muted">Earnings</div>
                                </div>
                                <div
                                    className="border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3">
                                    <div className="fs-4 fw-bolder text-gray-700">
                                        <span className="w-50px">130</span>
                                        <KTSVG path='/media/icons/duotune/arrows/arr065.svg' className='svg-icon-2 svg-icon-danger' />
                                    </div>
                                    <div className="fw-bold text-muted">Orders</div>
                                </div>
                            </div> */}
            </div>
            {/* <div className="d-flex flex-stack fs-4 py-3">
                            <div className="fw-bolder rotate collapsible" data-bs-toggle="collapse"
                                href="#kt_customer_view_details" role="button" aria-expanded="false"
                                aria-controls="kt_customer_view_details">Details
                            </div>
                            <span data-bs-toggle="tooltip" data-bs-dimiss="click" data-bs-trigger="hover"
                                title="Edit customer details">
                                <a href="#" className="btn btn-sm btn-light-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#kt_modal_update_customer">Edit</a>
                            </span>
                        </div> */}
            <div className='separator separator-dashed mb-3'></div>
            <div id='kt_customer_view_details' className='collapse show'>
              <div className='py-5 fs-6'>
                <div className='badge badge-light-info d-inline'>Premium user</div>
                {/* <div className='fw-bolder mt-5'>Account ID</div>
                <div className='text-gray-600'>ID-{currentUser?.id}</div> */}
                <div className='fw-bolder mt-5'>Primary Email</div>
                <div className='text-gray-600'>
                  <span className='text-gray-600 text-hover-primary'>{currentUser?.email}</span>
                </div>
                <div className='fw-bolder mt-5'>Primary Mobile</div>
                <div className='text-gray-600'>
                  <span className='text-gray-600 text-hover-primary'>{currentUser?.mobile}</span>
                </div>
                <div className='fw-bolder mt-5'>Address</div>
                <div className='text-gray-600'>
                  {currentUser?.address},
                  {/* <br />{currentUser?.shop_generel_info.province_division}
                                    <br />{currentUser?.shop_generel_info.country} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-lg-row-fluid ms-lg-15'>
        <div className='show-details'>
          <div className='card mb-6 mb-xl-9'>
            <div className='card-header border-0'>
              <div className='card-title'>
                <h2>Manage Password</h2>
              </div>
            </div>
            <div className='card-body py-0'>
              {editPass ? (
                <>
                  <div className='fs-5 fw-bold text-gray-500 mb-4'>
                    note: password must be of at least 6 characters.{' '}
                    <a href='#' onClick={() => setEditPass(false)}>
                      cancel
                    </a>
                  </div>
                  <div className='d-flex flex-wrap flex-stack mb-5'>
                    <form onSubmit={formik.handleSubmit}>
                      <div className='fv-row mb-3'>
                        <div className='row'>
                          <div className='col'>
                            <label className='required fs-6 fw-bold mb-2'>Old Password</label>
                            <input
                              {...formik.getFieldProps('oldPassword')}
                              type='password'
                              className='form-control form-control-solid'
                              placeholder=''
                              name='oldPassword'
                            />
                            {formik.touched.oldPassword && formik.errors.oldPassword && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.oldPassword}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='col'>
                            <label className='required fs-6 fw-bold mb-2'>New Password</label>
                            <input
                              {...formik.getFieldProps('password')}
                              type='password'
                              className='form-control form-control-solid'
                              placeholder=''
                              name='password'
                            />
                            {formik.touched.password && formik.errors.password && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert'>{formik.errors.password}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className='col'>
                            <label className='required fs-6 fw-bold mb-2'>Confirm Password</label>
                            <input
                              {...formik.getFieldProps('confirmPass')}
                              type='password'
                              className='form-control form-control-solid'
                              placeholder=''
                              name='confirmPass'
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
                        {/* begin::Actions */}
                        <div className='text-center pt-15'>
                          <button
                            type='reset'
                            // onClick={() => cancel()}
                            className='btn btn-light me-3'
                            data-kt-users-modal-action='cancel'
                            disabled={formik.isSubmitting}
                          >
                            Discard
                          </button>

                          <button
                            type='submit'
                            className='btn btn-primary'
                            data-kt-users-modal-action='submit'
                            disabled={
                              isUserLoading ||
                              formik.isSubmitting ||
                              !formik.isValid ||
                              !formik.touched
                            }
                          >
                            <span className='indicator-label'>Save</span>
                            {(formik.isSubmitting || isUserLoading) && (
                              <span className='indicator-progress'>
                                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                              </span>
                            )}
                          </button>
                        </div>
                        {/* end::Actions */}
                        {/* <div
                                                    className="border border-dashed border-gray-300 w-150px rounded my-3 p-4 me-6">
                                                    <span className="fs-1 fw-bolder text-gray-800 lh-1">
                                                        <span data-kt-countup="true"
                                                            data-kt-countup-value="6,840"
                                                            data-kt-countup-prefix="$">0</span>
                                                        <KTSVG path='/media/icons/duotune/arrows/arr066.svg' className='svg-icon-2 svg-icon-success' />
                                                    </span>
                                                    <span className="fs-6 fw-bold text-muted d-block lh-1 pt-2">Net
                                                        Earnings</span>
                                                </div>
                                                <div
                                                    className="border border-dashed border-gray-300 w-125px rounded my-3 p-4 me-6">
                                                    <span className="fs-1 fw-bolder text-gray-800 lh-1">
                                                        <span className="" data-kt-countup="true"
                                                            data-kt-countup-value="16">0</span>%
                                                        <KTSVG path='/media/icons/duotune/arrows/arr065.svg' className='svg-icon-2 svg-icon-danger' />
                                                    </span>
                                                    <span
                                                        className="fs-6 fw-bold text-muted d-block lh-1 pt-2">Change</span>
                                                </div> */}
                      </div>
                    </form>
                    {/* <a href="#"
                                            className="btn btn-sm btn-light-primary flex-shrink-0">Withdraw
                                            Earnings</a> */}
                  </div>
                </>
              ) : (
                <div className='fs-5 fw-bold text-gray-500 mb-4'>
                  Want to change password?{' '}
                  <a href='#' onClick={() => setEditPass(true)}>
                    click here.
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* <div className="card mb-6 mb-xl-9">
                        <div className="card-header">
                            <div className="card-title">
                                <h2>Statement</h2>
                            </div>
                            <div className="card-toolbar">
                                <ul className="nav nav-stretch fs-5 fw-bold nav-line-tabs nav-line-tabs-2x border-transparent"
                                    role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link text-active-primary active"
                                            data-bs-toggle="tab" role="tab"
                                            href="#kt_customer_view_statement_1">This Year</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link text-active-primary ms-3"
                                            data-bs-toggle="tab" role="tab"
                                            href="#kt_customer_view_statement_2">2020</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link text-active-primary ms-3"
                                            data-bs-toggle="tab" role="tab"
                                            href="#kt_customer_view_statement_3">2019</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link text-active-primary ms-3"
                                            data-bs-toggle="tab" role="tab"
                                            href="#kt_customer_view_statement_4">2018</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body pb-5">
                            <div id="kt_customer_view_statement_tab_content" className="tab-content">
                                <div id="kt_customer_view_statement_1"
                                    className="py-0 tab-pane fade show active" role="tabpanel">
                                    <table id="kt_customer_view_statement_table_1"
                                        className="table align-middle table-row-dashed fs-6 text-gray-600 fw-bold gy-4">
                                        <thead className="border-bottom border-gray-200">
                                            <tr
                                                className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                                <th className="w-125px">Date</th>
                                                <th className="w-100px">Order ID</th>
                                                <th className="w-300px">Details</th>
                                                <th className="w-100px">Amount</th>
                                                <th className="w-100px text-end pe-7">Invoice</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Nov 01, 2021</td>
                                                <td>
                                                    <a href="#"
                                                        className="text-gray-600 text-hover-primary">102445788</a>
                                                </td>
                                                <td>Darknight transparency 36 Icons Pack</td>
                                                <td className="text-success">$38.00</td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-light btn-active-light-primary">Download</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Oct 24, 2021</td>
                                                <td>
                                                    <a href="#"
                                                        className="text-gray-600 text-hover-primary">423445721</a>
                                                </td>
                                                <td>Seller Fee</td>
                                                <td className="text-danger">$-2.60</td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-sm btn-light btn-active-light-primary">Download</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
      <Modal show={infoModal} onHide={() => setInfoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile closePopuop={() => setInfoModal(false)}/>
        </Modal.Body>
        {/* <InfoModal setInfoModal={setInfoModal} data={currentUser} /> */}
      </Modal>
    </div>
  )
}
