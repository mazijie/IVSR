import {$get, $postForm} from '@/utils/request'

//example
export const uploadAPKFile = async (params) => {
    const data = await $postForm('/file', params)
    return data
}
export const scanFile = async (params) => {
    const data = await $get('/scan/static', params)
    return data
}

export const scanFileML = async (params) => {
    const data = await $get('/scan/ml', params)
    return data
}

export const generateReport = async (params) => {
    const data = await $get('/report', params)
    return data
}

export const viewFile = async (params) => {
    const data = await $get('/file/'+params.hash+'/'+params.filepath)
    return data
}