import request from '@/utils/request'
export const addFlower = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target
        }
    })
}
export const deleteFlower = (target) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`
    })
}
export const getUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'
    })
}
export const editUser = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}
export const editPhoto = (photo) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data: {
            photo
        }
    })
}
