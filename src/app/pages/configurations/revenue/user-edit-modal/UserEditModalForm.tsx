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
import { DatePickerCustom } from '../../../../modules/helpers/datepicker/date-picker'
import { getQueryRequest } from '../../../../modules/helpers/api'
import { GET_ORGANIZATION_LIST } from '../../../../constants/api.constants'
import { reactSelectify } from '../../../../modules/helpers/helper'
import moment from 'moment'

type Props = {
  isUserLoading: boolean
  user: User
}

const editUserSchema = Yup.object().shape({
  btrcShare: Yup.number()
    .required('This Field is required'),
    gpShare: Yup.number()
    .required('This Field is required'),
    airtelGrandShare: Yup.number()
    .required('This Field is required'),
    airtelShare: Yup.number()
    .required('This Field is required'),
    ait: Yup.number()
    .required('This Field is required'),
    billingFee: Yup.number()
    .required('This Field is required'),
    blGrandShare: Yup.number()
    .required('This Field is required'),
    blShare: Yup.number()
    .required('This Field is required'),
    discrepancy: Yup.number()
    .required('This Field is required'),
    gpGrandShare: Yup.number()
    .required('This Field is required'),
    partnerShare: Yup.number()
    .required('This Field is required'),
    robiGrandShare: Yup.number()
    .required('This Field is required'),
    robiShare: Yup.number()
    .required('This Field is required'),
    teletalkGrandShare: Yup.number()
    .required('This Field is required'),
    teletalkShare: Yup.number()
    .required('This Field is required'),
    vat: Yup.number()
    .required('This Field is required'),

})

const methodOptions = [
  {id: 0, label: 'POST', value: 0, },
  {id: 1, label: 'GET', value: 1},
  {id: 2, label: 'PUT', value: 2},
  {id: 3, label: 'DELETE', value: 3}
]

const statusOptions = [
  {id: 1, label: 'Active', value: 1},
  {id: 0, label: 'Inactive', value: 0}
]

const UserEditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const [state, setState] = useState({
    formData: {
      organizationList: [{}],
      status: [{}]
    }
  });
  const startDate = user?.startTime?.split(' ')[0] ? new Date(user?.startTime?.split(' ')[0]) : (new Date()); 
  const endDate = user?.endTime?.split(' ')[0] ? new Date(user?.endTime?.split(' ')[0]) : (new Date());
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    airtelGrandShare: user.airtelGrandShare || initialUser.airtelGrandShare,
    airtelShare: user.airtelShare || initialUser.airtelShare,
    ait: user.ait || initialUser.ait,
    billingFee: user.billingFee || initialUser.billingFee,
    blGrandShare: user.blGrandShare || initialUser.blGrandShare,
    blShare: user.blShare || initialUser.blShare,
    status: statusOptions.filter(e => e.id == user.status)[0] || state.formData.status,
    btrcShare: user.btrcShare|| initialUser.btrcShare,
    discrepancy: user.discrepancy || initialUser.discrepancy,
    gpGrandShare: user.gpGrandShare || initialUser.gpGrandShare,
    gpShare: user.gpShare || initialUser.gpShare,
    partnerShare: user.partnerShare || initialUser.partnerShare,
    remarks: user.remarks || initialUser.remarks,
    robiGrandShare: user.robiGrandShare || initialUser.robiGrandShare,
    robiShare: user.robiShare || initialUser.robiShare,
    teletalkGrandShare: user.teletalkGrandShare || initialUser.teletalkGrandShare,
    teletalkShare: user.teletalkShare || initialUser.teletalkShare,
    vat: user.vat || initialUser.vat,
    startTime: startDate,
    endTime: endDate
  })

  const handlePartnerOptionChange = (selectedOption: any) => {
    formik.setFieldValue('organization', selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };

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
            id: user?.id,
            airtelGrandShare: values.airtelGrandShare,
            airtelShare: values.airtelShare,
            ait: values.ait,
            billingFee: values.billingFee,
            blGrandShare: values.blGrandShare,
            blShare: values.blShare,
            btrcShare: values.btrcShare,
            discrepancy: values.discrepancy,
            gpGrandShare: values.gpGrandShare,
            gpShare: values.gpShare,
            organizationId: values.organization?.id,
            partnerShare: values.partnerShare,
            remarks: values.remarks,
            robiGrandShare: values.robiGrandShare,
            robiShare: values.robiShare,
            status: values.status.id,
            teletalkGrandShare: values.teletalkGrandShare,
            teletalkShare: values.teletalkShare,
            vat: values.vat,
            startTime: moment(values.startTime).format('MM-DD-YYYY HH:mm:ss'),
            endTime: moment(values.endTime).format('MM-DD-YYYY HH:mm:ss')
          }); 
          console.log('res: ', res);
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
            airtelGrandShare: values.airtelGrandShare,
            airtelShare: values.airtelShare,
            ait: values.ait,
            billingFee: values.billingFee,
            blGrandShare: values.blGrandShare,
            blShare: values.blShare,
            btrcShare: values.btrcShare,
            discrepancy: values.discrepancy,
            gpGrandShare: values.gpGrandShare,
            gpShare: values.gpShare,
            organizationId: values.organization?.id,
            partnerShare: values.partnerShare,
            remarks: values.remarks,
            robiGrandShare: values.robiGrandShare,
            robiShare: values.robiShare,
            status: values.status.id,
            teletalkGrandShare: values.teletalkGrandShare,
            teletalkShare: values.teletalkShare,
            vat: values.vat,
            startTime: moment(values.startTime).format('MM-DD-YYYY HH:mm:ss'),
            endTime: moment(values.endTime).format('MM-DD-YYYY HH:mm:ss')
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
      const res = await getQueryRequest(GET_ORGANIZATION_LIST);

      const organizationList = reactSelectify(res?.data, 'organizationName');

      const selectedOrg = organizationList?.filter(e => e.value == user?.organization); 

      setState({
        ...state, 
        formData: {
          ...state.formData, 
          organizationList: [...organizationList], 
      }});
      formik.setFieldValue('organization', selectedOrg.length ? selectedOrg[0] : {});
    };
    callAPI();
  }, []);

  console.log("formik: ", formik)

  return (
    <>
      <form
      id="kt_modal_update_customer_user_info"
      className="form"
      data-select2-id="select2-data-kt_modal_update_customer_user_info"
      onSubmit={formik.handleSubmit}
    >
      {/*end::Input group*/}
      <div className="fv-row mb-3" data-select2-id="select2-data-11-cia2">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gy-4">
          <div className="col" data-select2-id="select2-data-10-nrap">
            <label className="fs-6 fw-bold mb-2 required">OEM</label>
            <Select options={state?.formData?.organizationList}  onChange={handlePartnerOptionChange} value={formik.values.organization} name='organization'/>
          </div>
          <div className="col">
            <label className="fs-6 fw-bold mb-2 required">BTRC Share</label>
            <input
              type="number"
              {...formik.getFieldProps('btrcShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="btrcShare"
            />
            {formik.touched.btrcShare && formik.errors.btrcShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.btrcShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">GP Share</label>
            <input
              type="number"
              {...formik.getFieldProps('gpShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="gpShare"
            />
            {formik.touched.gpShare && formik.errors.gpShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.gpShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> Airtel Share </label>
            <input
              type="number"
              {...formik.getFieldProps('airtelShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="airtelShare"
            />
            {formik.touched.airtelShare && formik.errors.airtelShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.airtelShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">Robi Share</label>
            <input
              type="number"
              {...formik.getFieldProps('robiShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="robiShare"
            />
            {formik.touched.robiShare && formik.errors.robiShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.robiShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> BL Share </label>
            <input
              type="number"
              {...formik.getFieldProps('blShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="blShare"
            />
            {formik.touched.blShare && formik.errors.blShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.blShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">Teletalk Share</label>
            <input
              type="number"
              {...formik.getFieldProps('teletalkShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="teletalkShare"
            />
            {formik.touched.teletalkShare && formik.errors.teletalkShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.teletalkShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> Partner Share</label>
            <input
              type="number"
              {...formik.getFieldProps('partnerShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="partnerShare"
            />
            {formik.touched.partnerShare && formik.errors.partnerShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.partnerShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">GP Grand Share</label>
            <input
              type="number"
              {...formik.getFieldProps('gpGrandShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="gpGrandShare"
            />
            {formik.touched.gpGrandShare && formik.errors.gpGrandShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.gpGrandShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> Airtel Grand Share</label>
            <input
              type="number"
              {...formik.getFieldProps('airtelGrandShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="airtelGrandShare"
            />
            {formik.touched.airtelGrandShare && formik.errors.airtelGrandShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.airtelGrandShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">Robi Grand Share</label>
            <input
              type="number"
              {...formik.getFieldProps('robiGrandShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="robiGrandShare"
            />
            {formik.touched.robiGrandShare && formik.errors.robiGrandShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.robiGrandShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> BL Grand Share</label>
            <input
              type="number"
              {...formik.getFieldProps('blGrandShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="blGrandShare"
            />
            {formik.touched.blGrandShare && formik.errors.blGrandShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.blGrandShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">Teletalk Grand Share</label>
            <input
              type="number"
              {...formik.getFieldProps('teletalkGrandShare')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="teletalkGrandShare"
            />
            {formik.touched.teletalkGrandShare && formik.errors.teletalkGrandShare && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.teletalkGrandShare}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> Billing Fee</label>
            <input
              type="number"
              {...formik.getFieldProps('billingFee')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="billingFee"
            />
            {formik.touched.billingFee && formik.errors.billingFee && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.billingFee}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2">Discrepancy</label>
            <input
              type="number"
              {...formik.getFieldProps('discrepancy')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="discrepancy"
            />
            {formik.touched.discrepancy && formik.errors.discrepancy && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.discrepancy}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> Vat</label>
            <input
              type="number"
              {...formik.getFieldProps('vat')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="vat"
            />
            {formik.touched.vat && formik.errors.vat && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.vat}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col">
            <label className="fs-6 required fw-bold mb-2"> Ait </label>
            <input
              type="number"
              {...formik.getFieldProps('ait')}
              step="0.0001"
              min={0}
              className="form-control"
              placeholder=""
              name="ait"
            />
            {formik.touched.ait && formik.errors.ait && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.ait}</span>
                </div>
              </div>
            )}
          </div>
          <div className="col" data-select2-id="select2-data-16-j4z2">
            <label className="fs-6 required fw-bold mb-2"> Status </label>
            <Select options={statusOptions} name="status" value={formik.values.status} onChange={handleStatusChange}/>
          </div>
          <div className="col">
            <div id="date-parent-1" className="single-date position-relative">
              <label className="form-label required">Start Date</label>
              <DatePickerCustom selectedDate={formik.values.startTime} onChangeHandler={(date:Date) => formik.setFieldValue('startTime', date)}/>
            </div>
            `
          </div>
          <div className="col">
            <div id="date-parent-2" className="single-date position-relative">
              <label className="form-label required">End Date</label>
              <DatePickerCustom selectedDate={formik.values.endTime} onChangeHandler={(date:Date) => formik.setFieldValue('endTime', date)} />
            </div>
            `
          </div>
          <div className="col">
            <div id="date-parent-1" className="single-date position-relative">
              <label className="form-label">Remarks</label>
              <textarea className="form-control"  {...formik.getFieldProps('remarks')} name="remarks"/>
            </div>
            `
          </div>
        </div>
      </div>
      {/*begin::Input group*/}

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