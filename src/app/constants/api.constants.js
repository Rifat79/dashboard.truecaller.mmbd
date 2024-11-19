export const BASE_URL = process.env.REACT_APP_API_URL

export const ORDER_LIST = `${BASE_URL}/report/api/v2/truecaller/dashboard/orders`
export const REFERENCE_LIST = `${BASE_URL}/report/api/v2/truecaller/dashboard/references`
export const GET_DASHBOARD_SUMMARY = `${BASE_URL}/report/api/v2/truecaller/dashboard/summary`
export const GET_PERMISSIONS = BASE_URL + '/auth/user-permissions'
export const USER_SIGN_IN = BASE_URL + '/auth/user/sign-in'
export const BTS_REPORT = BASE_URL + '/report/api/v2/bts/report'
export const UBUNDLE_REPORT = BASE_URL + '/report/api/v2/ubundle/report'
export const ADF_REPORT = BASE_URL + '/report/api/v2/adf/report'
export const AIH_REPORT = BASE_URL + '/report/api/v2/aih/report'
export const PUBLIC_KEY_DOWNLOAD = 'https://api.hullor.io' + '/api/v2/truecaller-bundle/public-key'
export const BUNDLE_REDEEM_HISTORIES = BASE_URL + '/api/v2/truecaller-bundle/redeem-histories'
export const DOB_SUBSCRIBERS_LIST = BASE_URL + '/report/api/v2/dob/subscribers'
export const GP_DOB_UNSUBSCRIBE = 'https://api.hullor.io' + '/api/v2/gpdob/unsubscribe'
export const BL_DOB_UNSUBSCRIBE = 'https://api.hullor.io' + '/api/v2/bldob/unsubscribe'
export const ROBI_DOB_UNSUBSCRIBE = 'https://api.hullor.io' + '/api/v2/robidob/unsubscribe'
