import {reqSwiperList,reqCateList,reqFloorList} from '../../api/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
    data:{
        swiperList:[],
        cateList:[],
        floorList:[]
    },
    onLoad(){
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()
    },
    async getSwiperList(){
        const swiperList = await reqSwiperList()
        this.setData({
            swiperList
        })
        console.log(swiperList)
    },
    async getCateList(){
        const cateList = await reqCateList()
        this.setData({
            cateList
        })
    },
    async getFloorList(){
        const floorList = await reqFloorList()
        this.setData({
            floorList
        })
    }
})