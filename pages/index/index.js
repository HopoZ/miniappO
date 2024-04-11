// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  onPlateNumberChange: function (event) {
    this.setData({
      plateNumber: event.detail.value
    });
  },
  onPasswordChange: function (event) {
    this.setData({
      password: event.detail.value
    });
  },
  onAuthenticate: function () {
    const plateNumber = this.data.plateNumber;
    const password = this.data.password;
    wx.request({
      url: 'http://localhost/user/register',
      url: 'http://localhost:8078/user/login',
      url: 'http://localhost:8078/user/login',
      url: 'http://localhost:8078/user/login',
      method: 'POST',
      data: {
        carNumber: plateNumber,
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
          url: '/pages/logs/logs',
        })
        }else{
          wx.showToast({
            title: '失败，请重试',
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
  onRegister: function () {
    const plateNumber = this.data.plateNumber;
    const password = this.data.password;
    wx.request({
      url: 'http://localhost:8078/user/register',
      method: 'POST',
      data: {
        carNumber: plateNumber,
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
  Jump:function(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  }

})
