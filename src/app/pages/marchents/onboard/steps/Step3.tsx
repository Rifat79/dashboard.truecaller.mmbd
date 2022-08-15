import React, { FC } from 'react'
import { Field, ErrorMessage } from 'formik'
import CropperComponents from '../../../../modules/helpers/cropper/CropperComponents'

const Step3: FC<{ formik: any }> = ({ formik }) => {
  const tifOptions = formik.errors && formik.errors.config && Object.keys(formik.errors.config).map(key =>
    <p className='text-danger'>{formik.errors.config[key]}</p>
  )

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>Store Configuration</h2>
      </div>

      <div className='row w-100 w-xl-750px'>
        <div className='fv-row col-3'>
          <div>
            <label className='d-block fw-bold fs-6 mb-5'>Light Logo</label>
            <CropperComponents
              className="w-125px h-60px"
              full=""
              height={220} width={56}
              onCroped={(img: any) => formik.setFieldValue('config.logo_light', img[0])} src={formik.values.config.logo_light} />
          </div>
          <div>
            <label className='d-block fw-bold fs-6 mb-5'>Dark Logo</label>
            <CropperComponents
              className="w-125px h-60px"
              full=""
              height={220} width={56}
              onCroped={(img: any) => formik.setFieldValue('config.logo_dark', img[0])} src={formik.values.config.logo_dark} />
          </div>
        </div>
        <div className='col'>
          <div className='fv-row '>
            <div className='d-flex align-items-center'>
              <label className='required fw-bold fs-6 me-2 min-w-80px'>Store Name</label>
              <div>
                <Field
                  type='text'
                  className='form-control form-control-solid'
                  name='config.site_title'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='config.site_title' />
                </div>
              </div>
            </div>
            {/* end::Input */}
            <div className='fv-row mb-4'>
              <div className='d-flex align-items-center mt-4'>
                <label className='required fw-bold fs-6 me-2 min-w-80px'>Business Name</label>
                <div>
                  <Field
                    type='text'
                    className='form-control form-control-solid'
                    name='config.business_name'
                  />
                  <div className='text-danger mt-2'>
                    <ErrorMessage name='config.business_name' />
                  </div>
                </div>
              </div>
            </div>

            <div className='d-flex align-items-center'>
              <label className='required fw-bold fs-6 me-2 min-w-80px'>Primary Color</label>
              <div>
                <Field
                  type='color'
                  className='form-control h-25px w-80px'
                  name='config.primary_color'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='config.primary_color' />
                </div>
              </div>
            </div>
            {/* end::Input */}
            <div className='mb-1'>
              <label className="form-check form-switch form-check-custom form-check-solid">
                <span className="form-check-label fs-6 fw-bold ms-0 me-2">
                  Show Quick View
                </span>
                <Field
                  type='checkbox'
                  className='form-check-input'
                  name='config.show_quick_view'
                  value='1'
                />
              </label>
              <div className='text-danger mt-2'>
                <ErrorMessage name='config.show_quick_view' />
              </div>
            </div>

            <div className='mb-1'>
              <label className="form-check form-switch form-check-custom form-check-solid">
                <span className="form-check-label fs-6 fw-bold ms-0 me-2">
                  Show Ratings
                </span>
                <Field
                  type='checkbox'
                  className='form-check-input'
                  name='config.show_ratings'
                  value='1'
                />
              </label>
              <div className='text-danger mt-2'>
                <ErrorMessage name='config.show_ratings' />
              </div>
            </div>

            <div className='mb-1'>
              <label className="form-check form-switch form-check-custom form-check-solid">
                <span className="form-check-label fs-6 fw-bold ms-0 me-2">
                  Show Wishlist
                </span>
                <Field
                  type='checkbox'
                  className='form-check-input'
                  name='config.show_wishlist'
                  value='1'
                />
              </label>
              <div className='text-danger mt-2'>
                <ErrorMessage name='config.show_wishlist' />
              </div>
            </div>

          </div>
        </div>
        {tifOptions && tifOptions}
      </div>

    </div>
  )
}

export { Step3 }
