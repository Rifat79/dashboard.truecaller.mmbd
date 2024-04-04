import axios from 'axios';
import { BASE_URL, USER_SIGN_IN } from '../../../constants/api.constants';
import { AuthModel, UserModel } from './_models';

const API_URL = BASE_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/auth/refreshToken`
export const LOGIN_URL = `${API_URL}/api/v2/truecaller/dashboard/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(USER_SIGN_IN, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    refresh_token: `Bearer ${token}`,
  })
}
