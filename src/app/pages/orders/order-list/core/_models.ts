import {ID, Response} from '../../../../../_metronic/helpers'

export type TableModal = {
  id: ID
  invoice_id: string
  customer_name: string
  msisdn: string
  total: string
  payment_channel: string
  channel: string
  order_status: string
  order_status_id: number
  payment_method: string
  shipping_address: string
  discount: number | any
  extra_discount: number | any
  promo_discount: number | any
  subtotal: string
  email: string
  shipping_fee: string
  delivery_date: string
  tax: string
  created_at?: any
  payment_status?: any
  next_renew_date?: any
  price?: any
  request_type?: any
  name?: any
  reference?: any
}

export type TableModalsQueryResponse = Response<Array<TableModal>>
