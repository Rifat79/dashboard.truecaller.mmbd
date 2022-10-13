import React from 'react'
import Slider from 'react-slick'
import '../../../../../../node_modules/slick-carousel/slick/slick.css'
import '../../../../../../node_modules/slick-carousel/slick/slick-theme.css'
import { useQueryRequest } from '../core/QueryRequestProvider'
import { initialQueryState } from '../../../../../_metronic/helpers'
import { useState } from 'react'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 6,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}



export default function PartnerListSlider ({partners = []}) {
    const {updateState} = useQueryRequest()
    const [activePartner, setPartner] = useState(0);
    const filterData = (id) => {
        updateState({
          filter: {id},
          ...initialQueryState,
        })
        setPartner(id || 0);
      }
  return (
    <Slider {...settings} className='d-flex'>
      <li onClick={() => filterData(undefined)}>
        <input
          type='radio'
          className='btn-check'
          name='partner_name'
          id='partner_option_all'
          defaultValue='all'
          checked ={activePartner == 0}
        />
        <label
          className='btn btn-outline min-h-125px overflow-hidden position-relative btn-outline-dashed btn-outline-default p-2 d-flex flex-column flex-center align-items-center mb-5 me-5'
          htmlFor='partner_option_all'
        >
          <div className='nav-icon mb-2'>
            <span className='svg-icon svg-icon-muted svg-icon-2hx'>
              <svg
                version='1.1'
                id='Capa_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 56 56'
                xmlSpace='preserve'
              >
                <g>
                  <g>
                    <path
                      d='M43.636,52H8.364C3.745,52,0,48.255,0,43.636V8.364C0,3.745,3.745,0,8.364,0h35.272
 C48.255,0,52,3.745,52,8.364v35.272C52,48.255,48.255,52,43.636,52z'
                      style={{fill: 'rgb(58, 188, 167)'}}
                    />
                    <path
                      d='M44,14H26c-0.552,0-1-0.447-1-1s0.448-1,1-1h18c0.552,0,1,0.447,1,1S44.552,14,44,14z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                    <path
                      d='M44,28H26c-0.552,0-1-0.447-1-1s0.448-1,1-1h18c0.552,0,1,0.447,1,1S44.552,28,44,28z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                    <path
                      d='M44,42H26c-0.552,0-1-0.447-1-1s0.448-1,1-1h18c0.552,0,1,0.447,1,1S44.552,42,44,42z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                    <path
                      d='M12.071,17c-0.209,0-0.42-0.065-0.6-0.2L6.9,13.371c-0.442-0.331-0.531-0.958-0.2-1.399
 s0.958-0.531,1.4-0.2l3.822,2.866l6.248-7.288c0.36-0.42,0.992-0.468,1.41-0.108c0.419,0.359,0.468,0.99,0.108,1.409l-6.857,8
 C12.633,16.881,12.354,17,12.071,17z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                    <path
                      d='M12.071,31c-0.209,0-0.42-0.065-0.6-0.2L6.9,27.371c-0.442-0.331-0.531-0.958-0.2-1.399
 s0.958-0.531,1.4-0.2l3.822,2.866l6.248-7.288c0.36-0.42,0.992-0.468,1.41-0.108c0.419,0.359,0.468,0.99,0.108,1.409l-6.857,8
 C12.633,30.881,12.354,31,12.071,31z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                    <path
                      d='M12.071,45.999c-0.209,0-0.42-0.065-0.6-0.2L6.9,42.37c-0.442-0.331-0.531-0.958-0.2-1.399
 s0.958-0.531,1.4-0.2l3.822,2.866l6.248-7.287c0.36-0.421,0.992-0.469,1.41-0.108c0.419,0.359,0.468,0.99,0.108,1.409
 l-6.857,7.999C12.633,45.88,12.354,45.999,12.071,45.999z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                  </g>
                  <g>
                    <path
                      d='M54.805,46.679l-0.107,0.163c-7.121,10.876-18.773,10.876-25.893,0l0,0l0.107-0.163
 C36.033,35.803,47.685,35.803,54.805,46.679L54.805,46.679z'
                      style={{fill: 'rgb(255, 255, 255)'}}
                    />
                    <circle cx='41.569' cy='44.397' r='5.909' style={{fill: 'rgb(85, 96, 128)'}} />
                    <path
                      d='M41.752,56c-5.254,0-10.148-3.058-13.783-8.609l-0.358-0.547l0.465-0.711
 c3.635-5.552,8.53-8.609,13.784-8.609c5.253,0,10.148,3.057,13.783,8.609L56,46.679l-0.465,0.711C51.9,52.942,47.005,56,41.752,56
 z M30.008,46.839C33.214,51.463,37.365,54,41.752,54c4.436,0,8.63-2.594,11.85-7.317c-3.206-4.624-7.356-7.161-11.743-7.161
 C37.422,39.522,33.229,42.116,30.008,46.839z'
                      style={{fill: 'rgb(177, 211, 239)'}}
                    />
                  </g>
                </g>
              </svg>
            </span>
          </div>
          <span className='nav-text text-muted fs-7 lh-1'>All</span>
          {/* <span className='nav-text text-gray-700 fw-bolder fs-6 lh-1 pt-2'>2300</span> */}
          {activePartner == 0 && (
            <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary' />
          )}
        </label>
      </li>
      {partners?.map((item, indx) => (
        <div key={indx} onClick={() => filterData(item?.id)}>
          <input
            type='radio'
            className='btn-check'
            name='partner_name'
            id={`partner_option_${item?.id}`}
            defaultValue='Winmax'
            checked={activePartner == item?.id}
          />
          <label
            className='btn btn-outline min-h-125px overflow-hidden position-relative btn-outline-dashed btn-outline-default p-2 d-flex flex-column flex-center align-items-center mb-5 me-5'
            htmlFor='partner_option_1'
          >
            <div className='nav-icon'>
              <img
                alt=''
                src={item?.organizationLogo}
                className='w-70px img-fluid'
              />
            </div>
            <span className='nav-text text-muted fs-7 lh-1'>{item?.organizationName}</span>
            <span className='nav-text text-gray-700 fw-bolder fs-6 lh-1 pt-2'>{item?.id}</span>
            {activePartner == item?.id && (
              <span className='bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary' />
            )}
          </label>
        </div>
      ))}
    </Slider>
  )
}
