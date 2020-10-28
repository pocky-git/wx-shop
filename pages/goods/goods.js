import {reqGoodsList} from '../../api/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    tabs:[
      {
        id:0,
        text:'综合',
        isActive:true
      },
      {
        id:1,
        text:'销量',
        isActive:false
      },
      {
        id:2,
        text:'价格',
        isActive:false
      },
    ],
    goods:[],
    pagenum:1,
    pagesize:10,
    totalpage:1
  },
  onLoad(options) {
    this.cid = options.cid
    this.getGoodsList()
  }, 
  async getGoodsList(){
    const {pagenum,pagesize} = this.data
    const goodsList = await reqGoodsList({
      cid:this.cid,
      pagesize,
      pagenum
    })
    const {total} = goodsList
    const totalpage = Math.ceil(total/pagesize)
    this.setData({
      goods:goodsList.goods,
      totalpage
    })
  },
  handleTabChange(e){
    const index = e.detail
    const tabs = this.data.tabs.map(item=>({
      ...item,
      isActive:item.id===index?true:false
    }))
    this.setData({
      tabs
    })
  },
  async onReachBottom(){
    let {pagenum,pagesize,goods,totalpage} = this.data
    pagenum++
    if(pagenum>totalpage){
      wx.showToast({
        title: '到底啦'
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    const goodsList = await reqGoodsList({
      cid:this.cid,
      pagesize,
      pagenum
    })
    this.setData({
      pagenum,
      goods:[...goods,...goodsList.goods]
    })
    wx.hideLoading()
  },
  async onPullDownRefresh(){
    const {pagesize} = this.data
    const goodsList = await reqGoodsList({
      cid:this.cid,
      pagesize,
      pagenum:1
    })
    this.setData({
      goods:goodsList.goods,
      pagenum:1
    })
    wx.stopPullDownRefresh()
  }
})