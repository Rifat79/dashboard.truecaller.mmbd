import * as Yup from 'yup'

export interface IBasicDetails {
  domain: string
  mobile: string
  email: string
  country: string
  timezone: string
  currency: string
  office_address: string
  business_address: string
}
export interface IAdminAccess {
  name: string
  mobile: string
  email: string
  password: string
  avatar: string
}
export interface IConfig {
  site_title: string
  business_name: string
  primary_color: string
  logo_dark: string
  logo_light: string
  show_quick_view: string
  show_ratings: string
  show_wishlist: string
}

export interface ICreateAccount {
  details: IBasicDetails
  account: IAdminAccess
  config: IConfig
  theme: number
}

const createAccountSchemas = [
  Yup.object().shape({
    details: Yup.object().shape({
      domain: Yup.string()
        .required()
        .url(),
      mobile: Yup.string().required(),
      email: Yup.string()
        .min(5, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .email()
        .required(),
      country: Yup.string().required(),
      currency: Yup.string().required(),
    })
  }),
  Yup.object().shape({
    account: Yup.object().shape({
      name: Yup.string().required(),
      mobile: Yup.string().required(),
      email: Yup.string()
        .min(5, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .email()
        .required(),
      password: Yup.string()
        .min(5, 'Minimum 8 symbols')
        .max(50, 'Maximum 50 symbols')
        .required(),
    })
  }),
  Yup.object().shape({
    config: Yup.object().shape({
      site_title: Yup.string().required(),
      business_name: Yup.string().required(),
      primary_color: Yup.string().required(),
    })
  }),
  Yup.object({
    theme: Yup.number().required(),
  }),
]

const inits: ICreateAccount = {
  details: {
    domain: '',
    mobile: '',
    email: '',
    country: 'BD',
    timezone: 'Asia/Dhaka',
    currency: 'BDT',
    office_address: '',
    business_address: ''
  },
  account: {
    name: '',
    mobile: '',
    email: '',
    password: '',
    avatar: ''
  },
  config: {
    site_title: '',
    business_name: '',
    primary_color: '',
    logo_dark: '',
    logo_light: '',
    show_quick_view: '',
    show_ratings: '',
    show_wishlist: ''
  },
  theme: 0,
}

export { createAccountSchemas, inits }
