// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    carData: {},
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
    carPhotoUrl: ''
  },
  onLoad(options) {
    // 获取上一个页面传递过来的参数
    const  carNumber  = options.carNumber;
    console.log('获取的车牌号',carNumber)
    this.getDetailedData(carNumber);
  },
  // 获取车辆详细信息
  getDetailedData(carNumber) {
    wx.request({
      url: 'http://82.156.65.122:8078/web/getDetailedData',
      method: 'GET',
      data: {
        carNumber:carNumber
      },
      success: (res) => {
        console.log("res.data: ", res.data);
        const updatedCarData = res.data;
        updatedCarData.alcoholConc = (updatedCarData.alcoholConc * 100).toFixed(2);
        this.setData({
          carData: updatedCarData
        }, () => {
          console.log("carData", this.data.carData);
          // 在 setData 的回调函数中调用 AddPhoto 方法
          this.AddPhoto();
        });
      }      
    });
  },
  // 获取车辆照片
  AddPhoto() {
    const imageKownUrl = 'http://82.156.65.122:8060/photoKnow/';
    const imageUnknownUrl = 'http://82.156.65.122:8060/photoUnknow/';
    const carNumber = this.data.carData.carNumber;

    // 尝试获取已知照片
    wx.downloadFile({
      url: imageKownUrl + carNumber + '.jpg',
      success: (res) => {
        if (res.statusCode === 200) {
          // 已知照片存在
          const tempFilePath = res.tempFilePath;
          // 更新数据
          this.setData({
            carPhotoUrl: tempFilePath
          });
        } else {
          // 如果已知照片不存在，则尝试获取未知照片
          wx.downloadFile({
            url: imageUnknownUrl + carNumber + '.jpg',
            success: (res) => {
              if (res.statusCode === 200) {
                // 未知照片存在
                const tempFilePath = res.tempFilePath;
                // 更新数据
                this.setData({
                  carPhotoUrl: tempFilePath
                });
              } else {
                // 未知照片也不存在
                wx.showToast({
                  title: '无法获取照片',
                  icon: 'none',
                  duration: 2000
                });
              }
            },
            fail: () => {
              wx.showToast({
                title: '无法获取照片',
                icon: 'none',
                duration: 2000
              });
            }
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '无法获取照片',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
})
