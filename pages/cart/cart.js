import { chooseAddress,getSetting } from '../../utils/utils'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    carts: [],
    totalPrice: 0,
    totalNum: 0,
    allChecked: true,
    address: {}
  },
  onShow() {
    this.setAddress()
    this.setCart()
  },
  setCart() {
    const carts = wx.getStorageSync('carts') || []
    let totalPrice = 0
    let totalNum = 0
    carts.forEach(item => {
      if (item.isSelect) {
        totalPrice += item.goods_price * item.num
        totalNum += item.num
      }
    })
    const allChecked = carts.length>0?carts.every(item => item.isSelect):false
    this.setData({
      carts,
      totalPrice,
      totalNum,
      allChecked
    })
  },
  handeItemChange(e) {
    const goods_id = e.target.dataset.id
    const { carts } = this.data
    const goods = carts.find(item => item.goods_id === goods_id)
    goods.isSelect = !goods.isSelect
    wx.setStorageSync('carts', carts)
    this.setCart()
  },
  handleItemNumEdit(e) {
    const goods_id = e.target.dataset.id
    const operation = e.target.dataset.operation
    const { carts } = this.data
    const index = carts.findIndex(item => item.goods_id === goods_id)
    carts[index].num += operation
    if (carts[index].num <= 0) {
      carts.splice(index, 1)
    }
    wx.setStorageSync('carts', carts)
    this.setCart()
  },
  handleItemAllCheck(e) {
    const { carts, allChecked } = this.data
    carts.forEach(item => {
      item.isSelect = !allChecked
    })
    wx.setStorageSync('carts', carts)
    this.setCart()
  },
  setAddress(){
    const address = wx.getStorageSync('address') || {}
    this.setData({
      address
    })
  },
  async handleChooseAddress() {
    const info = await getSetting()
    if(!info.authSetting['scope.address']){
      wx.openSetting()
    }
    const address = await chooseAddress()
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    wx.setStorageSync('address', address)
    this.setData({
      address
    })
  }
})