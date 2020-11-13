import request from '@/utils/request'

export const getArticle = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}
export const getChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}
export const addChannels = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data
    })
}
export const deleteUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`
    })
}
export const getArticles = (articleId) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`
    })
}
export const addCollect = (target) => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/collections',
		data: {
			target
		}
	})
}
export const deleteCollect = (target) => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/article/collections/${target}`
	})
}
export const addLike = (target) => {
	return request({
		method: 'POST',
		url: '/app/v1_0/article/likings',
		data: {
			target
		}
	})
}
export const deleteLike = (target) => {
	return request({
		method: 'DELETE',
		url: `/app/v1_0/article/likings/${target}`
	})
}
