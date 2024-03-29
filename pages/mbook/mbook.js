//获取应用实例
var util = require('../../utils/util.js');

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    list: {},
    yearmonth: util.formatDate(new Date),
    yearmonthstr: util.formatDate(new Date),
    jieyu: "0.00",
    sumin: "0.00",
    sumout: "0.00",
    scrollHeight: 0,
    topHeight: 0,
    homeimg: '/imges/3.jpg',
    homecolor: '#fff',
    reload: "none",
    xljt: "none",
    thedate:'',
    theincome:'',
    thepay:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("页面初始化");
    var obj = this;

    var _systhemes = wx.getStorageSync('systhemes');
    if (_systhemes) {
      obj.setData({
        homeimg: _systhemes.homeimg,
        homecolor: _systhemes.color
      });
    }

    wx.getSystemInfo({
      success: function(res) {
        var _topHeight = res.windowHeight * 0.28;
        obj.setData({
          scrollHeight: res.windowHeight - _topHeight,
          topHeight: _topHeight,
        });
      }
    });
    obj.getPageRequset();
    // if (app.globalData.openid != "") {
    //   obj.getPageRequset();
    // } else {
    //   app.openidCallback = openid => {
    //     obj.getPageRequset();
    //   }
    // }

  },//

  // 加载数据
  getPageRequset: function() {
    var obj = this;
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    console.log("加载默认数据");

    //月汇总
    // wx.request({
    //   url: app.siteInfo.apiurl + '/bill/getsumbymonth', //仅为示例，并非真实的接口地址
    //   data: {
    //     // user: app.globalData.openid,
    //     userid: "1001",
    //     time: obj.data.yearmonth,
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log('月汇总' + res);
    //     console.log('data数据' + res.data.data);
    //     console.log('result2数据' + res.data.result2);
    //     console.log('result数据' + res.data.result);
    //     obj.setData({
    //       reload: "none",
    //     });
    //     if (res.data.data == null) {
    //       obj.setData({
    //         xljt: "block",
    //       });
    //     } else {
    //       obj.setData({
    //         xljt: "none",
    //         jieyu: res.data.data,
    //         sumin: res.data.result,
    //         sumout: res.data.result2,
    //       });
    //     }

    //     // 隐藏导航栏加载框  
    //     wx.hideNavigationBarLoading();
    //   },
    //   fail: function (res) {
    //     // 隐藏导航栏加载框  
    //     console.log('失败');
    //     wx.hideNavigationBarLoading();
    //     obj.setData({
    //       reload: "block",
    //     });
    //   }
    // });

    //账单详细
    wx.request({
      url: app.siteInfo.apiurl + '/bill/getuserbillbytime', //仅为示例，并非真实的接口地址
      data: {
        // user: app.globalData.openid,
        userid:"1001",
        time: obj.data.yearmonth,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log('成功'+res);
        console.log('data数据' + res.data.data);
        console.log('result2数据' + res.data.result2);
        console.log('result数据' + res.data.result);
        obj.setData({
          reload: "none",
        });
        if (res.data.data == null) {
          obj.setData({
            xljt: "block",
          });
        }else{
          obj.setData({
            xljt: "none",
            list: res.data.data,
            thedate: res.data.data[0].createTime,
            dayin: res.data.result2,
            dayout: res.data.result,
            // jieyu: res.data.jieyu,
          // sumin: res.data.sumin,
          // sumout: res.data.sumout,
          });
        }

        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
      },
      fail: function(res) {
        // 隐藏导航栏加载框  
        console.log('失败' );
        wx.hideNavigationBarLoading();
        obj.setData({
          reload: "block",
        });
      }
    });

  },

  // 选择日期
  sltyearmonth: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      yearmonth: e.detail.value
    });
    this.getPageRequset();
  },

  // 添加
  addwater: function() {
    wx.navigateTo({
      url: '/pages/mbook/addwater'
    });
  },

  // 详情
  waterdetail: function(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/mbook/mdetail?id=' + e.currentTarget.dataset.id
    });
  },

  // 重新加载数据
  reloaddata: function(e) {
    var obj = this;
    if (app.globalData.openid != "") {
      obj.getPageRequset();
    } else {
      app.openidCallback = openid => {
        obj.getPageRequset();
      }
    }
  },

  setclick: function(e) {
    var obj = this;
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // 加载主题
    wx.request({
      url: app.siteInfo.apiurl + 'MBook/Getthemes',
      data: {
        model: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        obj.setData({
          homeimg: res.data.message.homeimg,
          homecolor: res.data.message.color
        });
        wx.setStorage({
          key: "systhemes",
          data: res.data.message,
          success: function(res) {
            console.log('缓存(themes)成功');
          }
        });
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
      }
    });

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'success_no_circle'
    // })
    console.log("下拉");
    var obj = this;
    obj.getPageRequset();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    var obj = this;
    this.setData({
      pageIndex: obj.data.pageIndex + 1
    });
    console.log(obj.data.pageIndex);
  },

  //滚动到底部触发事件  
  searchScrollLower: function() {
    console.log("到底了!!!");
  },

  //滚动到顶部/左边，会触发 scrolltoupper 事件
  bindscrolltoupper: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'success_no_circle'
    // })
    console.log("滚动到顶部");
    var obj = this;
    obj.getPageRequset();
  },

  onShareAppMessage: function(res) {
    return {
      title: '智慧记账本，美好生活从记账开始！',
      path: '/pages/mbook/mbook',
      imageUrl:'/imges/share.jpg'
    }
  }
})