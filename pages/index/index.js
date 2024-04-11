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
      method: 'POST',
      data: {
        carNumber: plateNumber,
        password: password
      },
      success: function (res) {
        console.log(res.data);
        // Handle success response
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        });
        // Redirect to another page or perform any other action
      },
      fail: function (error) {
        console.error(error);
        // Handle error
        wx.showToast({
          title: '注册失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }

})
