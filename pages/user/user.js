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
      backgroundColor: '#0066BA',
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
      //url: app.siteInfo.apiurl + '/bill/getuserbillinfo?userid=' + app.globalData.openid,
      url: 'http://localhost:8080/BookKeep/bill/getuserbillinfo?userid=1001',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        obj.setData({

          // jifen: res.data.jifen,
          lianxuday: res.data.result,
          sumcount: res.data.code,
          sumday: res.data.result2
        })
      }
    })
  },

  // 我的账单
  goinfo: function () {
    wx.navigateTo({
      url: '../info/info'
    })
  },

  // 我的账单
  gozhangdan: function() {
    wx.navigateTo({
      url: '../zhangdan/list'
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