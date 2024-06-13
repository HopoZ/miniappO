// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',

    },
    carNumber:'',
    password:'',
  },
  oncarNumberInput(event) {
    this.setData({
      carNumber: event.detail.value
    });
  },
  onPasswordInput(event) {
    this.setData({
      password: event.detail.value
    });
  },
  onAuthenticate: function () {
    const carNumber = this.data.carNumber;
    const password = this.data.password;
    wx.request({
      url: 'http://82.156.65.122:8078/user/login',
      method: 'POST',
      data: {
        carNumber: carNumber,
        password: password
      },
      success: function (res) {
        console.log("登陆后返回",res.data);
        if(res.data.state==true){
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
        wx.navigateTo({
          url: '/pages/logs/logs?carNumber='+carNumber,
        })
        }else{
          wx.showToast({
            title: '失败，密码错误',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (error) {
        console.error(error);
        // Handle error
        wx.showToast({
          title: '网络失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },  
  onRegister: function () {
    const carNumber = this.data.carNumber;
    const password = this.data.password;
    wx.request({
      url: 'http://82.156.65.122:8078/user/register',
      method: 'POST',
      data: {
        carNumber: carNumber,
        password: password
      },
      success: function (res) {
        console.log("注册后返回",res.data);
        if(res.data.state==true){
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        });
        wx.navigateTo({
          url: '/pages/index/index',
        })
        }else{
          wx.showToast({
            title: '失败，该车已注册',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (error) {
        console.error(error);
        // Handle error
        wx.showToast({
          title: '失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

})
