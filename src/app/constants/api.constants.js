
export const BASE_URL='http://172.16.34.108:8083'
export const GET_ORGANIZATION_LIST = `${BASE_URL}/partnerapi/organization/search`
export const GET_ROLE_LIST = `${BASE_URL}/partnerapi/role/search`
export const UPLOAD_IMAGE_BASE64 = `${BASE_URL}/partnerapi/image/upload`
export const CREATE_USER = `${BASE_URL}/partnerapi/user/create`
export const GET_ALL_PERMISSION = `${BASE_URL}/partnerapi/module/getAll`
export const GET_ALL_BRAND = `${BASE_URL}/partnerapi/brand/getAllByOrganization`
export const GET_ACTIVATION_DASHBOARD_DATA = `${BASE_URL}/partnerapi/subscriber/subscriberSummary`
export const GET_MODEL_LIST = `${BASE_URL}/partnerapi/model/byOrganizationId`
export const GET_GAME_REVENUE_CHART = `${BASE_URL}/partnerapi/revenue/chart`