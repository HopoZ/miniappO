// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    carData:{},
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    }
  },
  getDetailedData(){
    wx.request({
      url: 'http://172.20.58.167:8078/web/getDetailedData',
      method:'GET',
      data:{
        carNumber:'MNO345'
      },
      success:(res)=>{
        console.log("res.data: ",res.data)
        this.setData({
          carData: res.data
        })
        // console.log(this.carData) 我犯傻了，异步没考虑就调试
      }
    })
  },
  onLoad() {
    this.getDetailedData();
  }
})
