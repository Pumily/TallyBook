// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg: "",
    nickname: "",
    jifen: 0,
    lianxuday: 0,
    sumday: 0,
    sumcount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f47667',
    });
    var obj = this;
    if (app.globalData.userInfo) {
      obj.setData({
        userimg: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName
      })
    }

    obj.reload();
  },

  reload: function() {
    var obj = this;
    wx.request({
      url: app.siteInfo.apiurl + '/mbook/getuserhome?openid=' + app.globalData.openid,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        obj.setData({
          jifen: res.data.jifen,
          lianxuday: res.data.lianxuday,
          sumcount: res.data.sumcount,
          sumday: res.data.sumday
        })
      }
    })
  },

  // 我的积分
  gojifen: function() {
    wx.navigateTo({
      url: '../jifen/list'
    })
  },

  // 我的卡包
  gocards: function() {
    wx.navigateTo({
      url: '../cards/cards'
    })
  },

  // 我的账单
  gozhangdan: function() {
    wx.navigateTo({
      url: '../zhangdan/list'
    })
  },

  // 去邀请
  goyaoqing: function() {
    wx.showToast({
      title: '即将开放',
      icon: 'none',
      duration: 2000
    })
  },

  gojz: function() {
    wx.navigateTo({
      url: '../help/jz'
    })
  },

  // 帮助中心
  gohelp: function() {
    wx.navigateTo({
      url: '../help/help'
    })
  },

  // 帮助中心
  goabout: function() {
    wx.navigateTo({
      url: '../help/about'
    })
  },

  // 跳转商城
  goshop: function() {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },

  onGotUserInfo: function(e) {
    var obj = this;
    var userband = wx.getStorageSync('userband');
    if (!userband) {
      var userinfo = e.detail.userInfo;
      app.globalData.userInfo = userinfo;
      obj.setData({
        userimg: userinfo.avatarUrl,
        nickname: userinfo.nickName
      })
      wx.request({
        url: app.siteInfo.apiurl + '/mbook/userband?openid=' + app.globalData.openid,
        data: userinfo,
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res);
          wx.setStorageSync('userband', true);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    this.reload();
    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})