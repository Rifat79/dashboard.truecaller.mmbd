
export const BASE_URL='http://192.168.33.32:8080'
export const GET_ORGANIZATION_LIST = `${BASE_URL}/partnerapi/organization/search`
export const GET_ROLE_LIST = `${BASE_URL}/partnerapi/role/search`
export const UPLOAD_IMAGE_BASE64 = `${BASE_URL}/partnerapi/image/upload`
export const CREATE_USER = `${BASE_URL}/partnerapi/user/create`
export const GET_ALL_PERMISSION = `${BASE_URL}/partnerapi/module/getAll`
export const GET_ALL_BRAND = `${BASE_URL}/partnerapi/brand/getAllByOrganization`
export const GET_ACTIVATION_DASHBOARD_DATA = `${BASE_URL}/partnerapi/subscriber/dashBoard`
export const GET_MODEL_LIST = `${BASE_URL}/partnerapi/model/byOrganizationId`
export const GET_GAME_REVENUE_CHART = `${BASE_URL}/partnerapi/revenue/chart`
export const GET_KEYWORDS = `${BASE_URL}/partnerapi/pushpull/keywords`
export const GET_MAIN_DASHBOARD_DATA = `${BASE_URL}/partnerapi/dashBoard/`
export const GET_ACTIVATION_REPORT_SUMMARY = `${BASE_URL}/partnerapi/subscriber/search/summary`
export const GET_PUSHPULL_REPORT_SUMMARY = `${BASE_URL}/partnerapi/pushpull/search/summary`
export const GET_GAME_REPORT_SUMMARY = `${BASE_URL}/partnerapi/revenue/search/summary`
export const CHANGE_PASSWORD = `${BASE_URL}/partnerapi/user/changePassword`