const BASE = 'https://api-hmugo-web.itheima.net/api/public/v1'

export const request = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: BASE + params.url,
            success(res) {
                resolve(res.data.message)
            },
            fail(err){
                reject(err)
            }
        })
    })
}