import {reqCatesList} from '../../api/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data:{
    leftMenu:[],
    rightMenu:[],
    currentIndex:0,
    scrollTop:0
  },
  cates:[],
  onLoad(){
    this.getCatesList()
  },
  async getCatesList(){
    this.cates = await reqCatesList()
    const leftMenu = this.cates.map(item=>item.cat_name)
    const rightMenu = this.cates[0].children
    this.setData({
      leftMenu,
      rightMenu
    })
  },
  handleTap(e){
    const {index} = e.target.dataset
    const rightMenu = this.cates[index].children
    this.setData({
      currentIndex:index,
      rightMenu,
      scrollTop:0
    })
  }
})