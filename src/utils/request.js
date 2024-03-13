import axios from 'axios'

// 初始化实例
const instance = axios.create({
  baseURL: '/api',
  // timeout: 5000,
  withCredentials: true
})

// export function request (config) {
//   // 添加请求拦截器
//   instance.interceptors.request.use(function (config) {
//     return config
//   }, function (error) {
//     return Promise.reject(error)
//   })
//   // 添加响应拦截器
//   instance.interceptors.response.use(function (response) {
//     return response
//   }, function (error) {
//     if (error.response) {
//     }
//     return Promise.reject(error)
//   })
//   return instance(config)
// }

// get方法
export const $get = async (url, params) => {
  const { data } = await instance.get(url, {
    params
  })
  return data
}
// postFrom
export const $postForm = async (url, params) => {
  const { data } = await instance.post(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
  return data
}

// post
export const $post = async (url, params) => {
  const { data } = await instance.post(url, params)

  return data
}

// put
export const $put = async (url, params) => {
  const { data } = await instance.put(url, params)
  return data
}

// delete
export const $delete = async (url, params) => {
  const { data } = await instance.delete(url, 
    {data:params}
  )
  return data
}
