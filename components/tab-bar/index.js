// components/tab-bar/index.js
Component({
  properties: {
    tabs:{
      type:Array,
      data:[]
    }
  },
  methods:{
    handleTap(e){
      const {index} = e.target.dataset
      this.triggerEvent('tabChange',index)
    }
  }
})
