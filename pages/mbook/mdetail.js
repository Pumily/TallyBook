// pages/mbook/mdetail.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mdetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    console.log(options);
    wx.request({
      url: app.siteInfo.apiurl + '/mbook/GetMoneyDetail', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data);
        obj.setData({
          mdetail: res.data.message
        });
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
      },
      fail: function () {
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
      }
    });
  },

  // 删除记录
  delwater: function (e) {

    wx.showModal({
      title: '提示',
      content: '您确定要删除记录？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.siteInfo.apiurl + '/mbook/DelWater',
            data: { id: e.target.dataset.id },
            header: { 'content-type': 'application/json' },
            success: function (res) {

              wx.showToast({
                title: '删除成功',
                icon: 'success',
              });

              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/mbook/mbook',
                  success: function (e) {
                    console.log(e);
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  }
                });
              }, 1000);
            }
          });
        } else if (res.cancel) {
        }
      }
    })
  },

  // 修改记录
  updatewater: function (e) {
    console.log(e.target.dataset.mdetail);
    wx.navigateTo({
      url: '/pages/mbook/addwater?model=1&mdetail=' + JSON.stringify(e.target.dataset.mdetail)
    });
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