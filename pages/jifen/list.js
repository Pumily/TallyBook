const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, //页码
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlist();
  },

  getlist: function() {
    var obj = this;
    var _list = obj.data.list;
    wx.request({
      url: app.siteInfo.apiurl + '/mbook/GetJifen', //仅为示例，并非真实的接口地址
      data: {
        openid: app.globalData.openid,
        page: obj.data.page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        var _newlist = res.data.message;
        if (_newlist.length > 0) {
          obj.data.page += 1;
          for (var i in _newlist) {
            _list.push(_newlist[i])
          }
        }
        console.log(_list)
        obj.setData({
          list: _list
        });
      }
    });
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