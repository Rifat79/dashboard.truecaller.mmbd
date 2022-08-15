import React, { FC } from 'react'
import { Field, ErrorMessage } from 'formik'
import CropperComponents from '../../../../modules/helpers/cropper/CropperComponents'

const Step2: FC<{ formik: any }> = ({ formik }) => {
  const tifOptions = formik.errors && formik.errors.account && Object.keys(formik.errors.account).map(key =>
    <p className='text-danger'>{formik.errors.account[key]}</p>
  )

  return (
    <div className='w-100'>
      <div className='pb-10'>
        <h2 className='fw-bolder text-dark'>Account Info</h2>
      </div>

      <div className='row w-100 w-xl-750px'>
        <div className='fv-row col-3'>
          <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
          <CropperComponents
            className="w-125px h-125px"
            full=""
            height={400} width={400}
            onCroped={(img: any) => formik.setFieldValue('account.avatar', img[0])} src={formik.values.account.avatar} />
        </div>
        <div className='col'>
          <div className='fv-row '>
            <div className='d-flex align-items-center'>
              <label className='required fw-bold fs-6 me-2 min-w-80px'>Name</label>
              <div>
                <Field
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  name='account.name'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='account.name' />
                </div>
              </div>
            </div>
            {/* end::Input */}
            <div className='fv-row mb-4'>
              <div className='d-flex align-items-center mt-4'>
                <label className='required fw-bold fs-6 me-2 min-w-80px'>Mobile</label>
                <div>
                  <Field
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    name='account.mobile'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='account.mobile' />
                  </div>
                </div>
              </div>
            </div>
            <div className='fv-row mb-4'>
              <div className='d-flex align-items-center mt-4'>
                <label className='required fw-bold fs-6 me-2 min-w-80px'>Email</label>
                <div>
                  <Field
                    type='email'
                    className='form-control form-control-lg form-control-solid'
                    name='account.email'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='account.email' />
                  </div>
                </div>
              </div>
            </div>
            <div className='fv-row mb-4'>
              <div className='d-flex align-items-center mt-4'>
                <label className='required fw-bold fs-6 me-2 min-w-80px'>Password</label>
                <div>
                  <Field
                    type='password'
                    className='form-control form-control-lg form-control-solid'
                    name='account.password'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='account.password' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tifOptions && tifOptions}
      </div>
    </div>
  )
}

export { Step2 }
