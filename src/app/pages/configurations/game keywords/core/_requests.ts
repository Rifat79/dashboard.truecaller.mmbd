import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import { BASE_URL } from '../../../../constants/api.constants'
import {User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${BASE_URL}/api/gameKeywordConfig/create`
const GET_USERS_URL = `${BASE_URL}/api/gameKeywordConfig/search`
const GET_USER_BY_ID = `${BASE_URL}/api/gameKeywordConfig/get`
const UPDATE_USER = `${BASE_URL}/api/gameKeywordConfig/update`
const  DELETE_USER = `${BASE_URL}/api/gameKeywordConfig/delete`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${GET_USER_BY_ID}?organizationId=${id?.organizationId}&keyword=${id?.keyword}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(USER_URL, user)
    .then((response: any) => response)
    .then((response: any) => response)
}

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${UPDATE_USER}?organizationId=${user?.id?.organizationId}&keyword=${user?.id?.keyword}`, user)
    .then((response: any) => response)
    .then((response: any) => response)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.get(`${DELETE_USER}?organizationId=${userId?.organizationId}&keyword=${userId?.keyword}`).then((response: any) => response)
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
