var util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeimg: 'https://tooapi.tooao.cn/images/4.jpg',
    homecolor: '#fff',
    yearstr: util.formatYear(new Date),
    list: null,
    summoney: 0,
    sumshouru: 0,
    sumzhichu: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var obj = this;
    var _systhemes = wx.getStorageSync('systhemes');
    if (_systhemes) {
      obj.setData({
        homeimg: _systhemes.homeimg,
        homecolor: _systhemes.color
      });
    }

    obj.reload();
  },

  reload: function() {
    var obj = this;
    wx.request({
      url: app.siteInfo.apiurl + '/mbook/GetZhangDan', //仅为示例，并非真实的接口地址
      data: {
        openid: app.globalData.openid,
        year: obj.data.yearstr,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res);
        obj.setData({
          list: res.data.message,
          summoney: res.data.summoney,
          sumshouru: res.data.sumshouru,
          sumzhichu: res.data.sumzhichu,
        });
      }
    });
  },

  // 选择日期
  sltyearmonth: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      yearstr: e.detail.value + "年"
    });
    this.reload();
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