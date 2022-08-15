import React, { FC } from 'react'
import { ErrorMessage, Field } from 'formik'

const themes = [
  {
    id: 1,
    name: 'Emporium',
    img: '',
  },
  {
    id: 2,
    name: 'Styler',
    img: '',
  },
  {
    id: 3,
    name: 'Restaurant',
    img: '',
  },
  {
    id: 4,
    name: 'Beauty Shop',
    img: '',
  },
  {
    id: 5,
    name: 'E-Shop',
    img: '',
  },
  {
    id: 6,
    name: 'Eye Glasses',
    img: '',
  },
  {
    id: 7,
    name: 'Fashion',
    img: '',
  },
  {
    id: 8,
    name: 'Trendy Fashion',
    img: '',
  },
  {
    id: 9,
    name: 'Flower',
    img: '',
  },
  {
    id: 10,
    name: 'Furniture',
    img: '',
  },
  {
    id: 11,
    name: 'Gym',
    img: '',
  },
  {
    id: 12,
    name: 'Jewellery',
    img: '',
  },
]

const Step4: FC<{ formik: any }> = ({ formik }) => {

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Select Theme</h2>
      </div>
      <div className='row mw-500px mb-2' data-kt-buttons="true" data-kt-buttons-target=".form-check-image, .form-check-input">
        {
          themes &&
          themes.length > 0 &&
          themes.map((item, i) => (
            <div className='col' key={i}>
              <label className="form-check-image">
                <div className="form-check-wrapper">
                  <img src={item.img || "/media/misc/image.png"} />
                </div>

                <div className="form-check form-check-custom form-check-solid">
                  <Field
                    type='radio'
                    className='btn-check'
                    name='theme'
                    value={item.id}
                  />
                  <div className="form-check-label">{item.name}</div>
                </div>
              </label>
            </div>
          ))
        }
        <div className='text-danger mt-2'>
          <ErrorMessage name='theme' />
        </div>
      </div>
    </div>
  )
}

export { Step4 }
