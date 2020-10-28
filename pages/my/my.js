import { getUserInfo } from '../../utils/utils'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    userinfo:{},
    collectNums:0
  },
  onLoad(){
    this.getUserInfo()
  },
  onShow(){
    this.getCollect()
  },
  getUserInfo(){
    const userinfo = wx.getStorageSync('userinfo') || {}
    this.setData({
      userinfo
    })
  },
  async handleGetUserInfo(){
    const result = await getUserInfo()
    const userinfo = {
      avatarUrl:result.avatarUrl,
      nickName:result.nickName
    }
    wx.setStorageSync('userinfo', userinfo)
    this.setData({
      userinfo
    })
  },
  getCollect(){
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      collectNums:collect.length
    })
  },
  handleAddressChoose(){
    
  }
})