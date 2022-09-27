import {ID, Response} from '../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
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
  createdAt?: string
  updatedAt?: string
  status?: any
  airtelGrandShare?: number
  airtelShare?: number
  ait?: number
  billingFee?: number
  blGrandShare?: number
  blShare?: number
  btrcShare?: number
  discrepancy?: number
  endTime?: any
  gpGrandShare?: number
  gpShare?: number
  partnerShare?: number
  remarks?: any
  robiGrandShare?: number
  robiShare?: number
  startTime?: any
  teletalkGrandShare?: number
  teletalkShare?: number
  vat?: number
  organizationId?: ID
  organization?: any
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  name: '',
  email: '',
}
