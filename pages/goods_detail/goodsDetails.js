import { reqGoodsDetail } from '../../api/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goodsDetail: {},
    flag: true,
    isCollect: false
  },
  onLoad: function (options) {
    this.goods_id = options.goods_id
    this.getGoodsDetail()
    this.getCollect()
  },
  async getGoodsDetail() {
    const goodsDetail = await reqGoodsDetail({
      goods_id: this.goods_id
    })
    this.setData({
      goodsDetail
    })
  },
  handleAddCart() {
    const { goodsDetail, flag } = this.data
    if (!flag) {
      return
    }
    this.setData({
      flag: false
    })
    const carts = wx.getStorageSync('carts') || []
    const index = carts.findIndex(item => item.goods_id == this.goods_id)
    if (index !== -1) {
      carts[index].num += 1
      goodsDetail.isSelect = true
    } else {
      goodsDetail.num = 1
      goodsDetail.isSelect = true
      carts.push(goodsDetail)
    }
    wx.setStorageSync('carts', carts)
    wx.showToast({ title: '加入购物车成功' })
    this.timeout = setTimeout(() => {
      this.setData({
        flag: true
      })
    }, 2000)
  },
  handleCollect() {
    const { goodsDetail, isCollect } = this.data
    const collect = wx.getStorageSync('collect') || []
    const index = collect.findIndex(item => item.goods_id === goodsDetail.goods_id)
    if (index === -1) {
      collect.push(goodsDetail)
    } else {
      collect.splice(index, 1)
    }
    this.setData({
      isCollect: !isCollect
    })
    wx.setStorageSync('collect', collect)
  },
  getCollect() {
    const collect = wx.getStorageSync('collect')
    const isCollect = collect.some(item => item.goods_id == this.goods_id)
    this.setData({
      isCollect
    })
  },
  handlePreview(e) {
    const {goodsDetail} = this.data
    const imgList = goodsDetail.pics.map(item=>item.pics_big)
    const {index} = e.currentTarget.dataset
    const current = imgList[index]
    wx.previewImage({
      current: current, 
      urls: imgList
    })
  }
})