import {ID, Response} from '../../../../../_metronic/helpers'
export type User = {
  id?: ID
  filter_id?: ID
  name?: string
  organization?: any
  organizationId?: ID
  brand?: any
  keyword?: string
  subKeyword?: string
  deviceType?: any
  gameProvider?: string
  moduleUrl?: string
  moduleName?: string
  method?: any
  url?: string
  avatar?: string
  email?: string
  position?: string
  role?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  initials?: {
    label: string
    state: string
  }
  brandKeyword?: string
  createdAt?: string
  updatedAt?: string
  status?: any
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  name: '',
  email: '',
}
