import { reqGoodsSearch } from '../../api/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    searchList: [],
    isFocus: false,
    inputValue: ''
  },
  handleInput(e) {
    let query = e.detail.value.trim()
    if (!query) {
      this.setData({
        inputValue: ''
      })
      return
    }
    clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      const searchList = await reqGoodsSearch({
        query
      })
      this.setData({
        searchList,
        isFocus: true,
      })
    }, 1000)
  },
  handleCancel() {
    this.setData({
      searchList: [],
      isFocus: false,
      inputValue: ''
    })
  }
})