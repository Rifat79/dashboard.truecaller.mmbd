import {useEffect, useRef, useState} from 'react'
import {CSVLink} from 'react-csv'
import {isNotEmpty, stringifyRequestQueryWithoutPage} from '../../../../../../_metronic/helpers'
import {AIH_REPORT} from '../../../../../constants/api.constants'
import {getQueryRequest} from '../../../../../library/api.helper'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {TableModal} from '../../core/_models'

const CSVDownload = (props: any) => {
  const btnRef: any = useRef(null)
  useEffect(() => btnRef.current?.click(), [btnRef])
  return (
    <CSVLink {...props}>
      <span ref={btnRef} />
    </CSVLink>
  )
}

const ExcelExport = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const {state} = useQueryRequest()

  const [filename] = useState<string>(`truecaller-charge-histories.csv`)

  useEffect(() => {
    if (data.length > 0)
      setTimeout(() => {
        setData([])
      }, 300)
  }, [data])

  const getData = async () => {
    if (!loading) setLoading(true)
    // console.log('state', state)
    let filter = state.filter
      ? Object.entries(state.filter as Object)
          .filter((obj) => isNotEmpty(obj[1]))
          .map((obj) => {
            return `${obj[0]}=${obj[1]}`
          })
          .join('&')
      : ''
    let query = `page=1&items_per_page=100000&${stringifyRequestQueryWithoutPage(state)}`
    const res: any = await getQueryRequest(`${AIH_REPORT}?${query}`)
    setLoading(false)

    if (res.success && res.status_code === 200) {
      let lists: any = []
      if (res.data && res.data.length > 0) {
        res.data.map((item: TableModal) => {
          // let address =
          //   typeof item.shipping_address === 'string'
          //     ? JSON.parse(item.shipping_address)
          //     : item.shipping_address

          // let st_address = `${address.street_address}, ${address.area}, ${address.zone}, ${address.city}`
          // st_address = st_address.trim().replace(/\n/g, '')

          lists.push({
            date: item?.date,
            total_success: item?.total_success,
            price: item?.price_point,
            topline_revenue: item?.topline_revenue,
            payment_channel: item?.payment_channel,
            momagic_income: item?.momagic_income,
            partner_share: item?.partner_share,
          })
        })
      }
      // console.log(lists)
      setData(lists)
    }
  }

  // console.log(data)
  if (data.length > 0 && !loading)
    return <CSVDownload target='_self' filename={'AIHistory.csv'} data={data} />

  return (
    <div className='menu-item px-3'>
      <div className='menu-link px-3' onClick={getData}>
        {loading ? 'Loading...' : 'CSV'}
      </div>
    </div>
  )
}

export default ExcelExport
