var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  zhifu: function() {
    wx.request({
      url: app.siteInfo.apiurl + '/pay/gotopay',
      data: {
        openid: app.globalData.userId,
        roomid: '1',
        totalfee: 10,
        paytitle: "捐赠",
        pid: ""
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        try {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            'success': function(res) {
              console.log(res);
            },
            'fail': function(res) {
              console.log(res);
            }
          })
        } catch (e) {
          wx.showToast({
            title: '支付异常，请联系管理员',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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