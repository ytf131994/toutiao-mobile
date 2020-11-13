import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})
const refreshTokenReq = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function (error) {
    return Promise.reject(error)
})
request.defaults.transformResponse = [function (data) {
    try {
        return JSONbig.parse(data)
    } catch (error) {
        return data
    }
}]
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, async function (error) {
    // 对响应错误做点什么
    const status = error.response.status
    if (status === 400) {
        Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
        const { user } = store.state
        if (!user || !user.token) {
            return redirLogin()
        }
        try {
            const { data } = await refreshTokenReq({
                method: 'PUT',
                url: '/app/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }
            })
            user.token = data.data.token
            store.commit('setUser', user)
            return request(error.config)
        } catch (err) {
            redirLogin()
        }
    } else if (status === 403) {
         Toast.fail('没有权限操作')
    } else if (status === 500) {
         Toast.fail('服务器端异常')
    }
    return Promise.reject(error)
  })
function redirLogin () {
    router.replace({
        name: '/login',
        query: {
            redirect: router.currentRouter.fullPath
        }
    })
}
export default request
