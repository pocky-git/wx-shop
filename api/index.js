import {request} from './request'

export const reqSwiperList = () => request({
    url:'/home/swiperdata'
})

export const reqCateList = () => request({
    url:'/home/catitems'
})

export const reqFloorList = () => request({
    url:'/home/floordata'
})

export const reqCatesList = () => request({
    url:'/categories'
})

export const reqGoodsList = (data) => request({
    url:'/goods/search',
    data
})

export const reqGoodsDetail = (data) => request({
    url:'/goods/detail',
    data
})
export const reqGoodsSearch = (data) => request({
    url:'/goods/qsearch',
    data
})