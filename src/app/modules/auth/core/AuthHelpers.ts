import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'user'
const getAuth = (): any | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY); 
  if (!lsValue) {
    return
  }

  try {
    const auth: any = JSON.parse(lsValue);
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any, token: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {common: any, Authorization: any}}) => {
      const auth = getAuth();
      if (auth && auth.user.access_token) {
        config.headers.Authorization = `Bearer ${auth.user.access_token || token}`
        config.headers.common["x-access-token"] = `${auth.user.access_token || token}`
      } else {
        config.headers.common["x-access-token"] = ''
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
