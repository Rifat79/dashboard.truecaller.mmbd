import axios from 'axios'

export const queryRequest = async (url, data, method = 'POST') => {
    try {
        const { data: response } = await axios({
            method: method,
            url: url,
            data: data,
        })

        return response
    } catch (err) {
        return {
            success: false,
            status_code: 5001,
            message: err.message,
        }
    }
}
export const getQueryRequest = async (url) => {
    try {
        const { data: response } = await axios({
            method: 'GET',
            url: url,
        })

        return response
    } catch (err) {
        return {
            success: false,
            status_code: 5001,
            message: err.message,
        }
    }
}

export const queryRequestParallel = async (url, data) => {
    // con
    return await axios({
        method: 'POST',
        url: url,
        data: data,
    })
}

export const getQueryRequestParallel = async (url) => {
    return await axios({
        method: 'GET',
        url: url,
    })
}
export const ParallelApiCalling = async (promise) => {
    // promise = [getCompoents(), getMenuList(), getStoreInfo()]

    try {
        return await Promise.all(promise)
    } catch (err) {
        return err
    }
}
