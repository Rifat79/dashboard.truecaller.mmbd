import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {BASE_URL} from '../../../../../constants/api.constants'
import {getAuth} from '../../../../../modules/auth'
import {User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${BASE_URL}/partnerapi/subscriber/create`
const GET_USERS_URL = `${BASE_URL}/partnerapi/revenue/summary`
const GET_USER_BY_ID = `${BASE_URL}/partnerapi/subscriber/get`
const UPDATE_USER = `${BASE_URL}/partnerapi/subscriber/update`
const  DELETE_USER = `${BASE_URL}/partnerapi/subscriber/delete`

const auth = getAuth();

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?organization_id=${auth?.user?.organization || 20217}&${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${GET_USER_BY_ID}?id=${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: any): Promise<User | undefined> => {
  return axios
    .post(USER_URL, user)
    .then((response: any) => response)
    .then((response: any) => response)
}

const updateUser = (user: any): Promise<User | undefined> => {
  return axios
    .post(`${UPDATE_USER}`, user)
    .then((response: any) => response)
    .then((response: any) => response)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${DELETE_USER}?id=${userId}`).then((response: any) => response)
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
