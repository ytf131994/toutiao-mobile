import request from '@/utils/request'
export const getAssoiation = (q) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}
export const getResult = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}

export const getHistory = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search/histories'
    })
}
