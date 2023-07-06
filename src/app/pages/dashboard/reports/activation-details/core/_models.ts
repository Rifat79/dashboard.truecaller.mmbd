import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  mobile?: string
  email?: string
  address?: string
  image?: string
  roleList?: []
  organization?: any
  createdAt?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  role?: any
  position?: string
  avatar?: string
  initials?: {
    label: string
    state: string
  }
  password?: string
  confirmPass?: string
  created_at?: any
  payment_status?: any
  next_renew_date?: any
  price?: any
  request_type?: any
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  image: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  name: '',
  email: '',
}
