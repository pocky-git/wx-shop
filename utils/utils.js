export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success(res) {
                resolve(res.userInfo)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}