// pages/text/sendm.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _access_token: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;

    wx.request({
      url: app.siteInfo.apiurl + 'mbook/GetAccessToken',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
        obj.setData({
          _access_token: res.data.access_token
        });

        console.log(obj.data._access_token);
      }
    })
  },

  testSubmit: function (e) {
    var self = this;

    var _access_token = self.data._access_token;

    console.log("formid:" + e.detail.formId);

    var sendmessage = {
      access_token: _access_token,
      formid: e.detail.formId,
    }
    wx.request({
      url: app.siteInfo.apiurl + 'mbook/sendmessage',
      data: sendmessage,
      method: "POST",
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('request fail ', err);
      },
      complete: function (res) {
        console.log("request completed!");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})