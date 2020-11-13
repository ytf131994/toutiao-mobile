import request from '@/utils/request'
export const onLogin = (data) => {
    return request({
        url: '/app/v1_0/authorizations',
        method: 'POST',
        data
    })
}
export const sendYzm = (mobile) => {
    return request({
        url: `/app/v1_0/sms/codes/${mobile}`,
        method: 'GET'
    })
}
export const getUser = () => {
    return request({
        url: '/app/v1_0/user',
        method: 'GET'
    })
}
export const getChannels = () => {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'GET'
    })
}
