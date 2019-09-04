// pages/cards/addcard.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    cardinfo: null,
    cardtype: 0,
    cardimg: 'cards',
    gded_txt: '余额',
    gded_hide: 'none',
    yyed_hide: 'none',
    kyed_hide: 'none',
    zdr_hide: 'none',
    hkr_hide: 'none',
    yhkh_hide: 'none',
    add_hide: 'block',
    update_hide: 'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var obj = this;

    obj.setData({
      openid: app.globalData.openid,
      cardtype: options.carditem
    });

    if (options.id > 0) {
      wx.setNavigationBarTitle({
        title: '卡片详情'
      });
      wx.request({
        url: app.siteInfo.apiurl + 'mbook/GetCardDetail', //仅为示例，并非真实的接口地址
        data: {
          id: options.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res.data);
          obj.setData({
            cardinfo: res.data.message,
            cardtype: res.data.message.type,
            add_hide: 'none',
            update_hide: 'block'
          })
        }
      });
    } else {
      wx.setNavigationBarTitle({
        title: '添加卡片'
      })
    }

    if (options.carditem == 1) //在线支付
    {
      obj.setData({
        gded_txt: '余额',
        kyed_hide: 'block',
        cardimg: 'cards_zxzf',
      });
    } else if (options.carditem == 2) //储蓄卡
    {
      obj.setData({
        gded_txt: '余额',
        kyed_hide: 'block',
        yhkh_hide: 'block',
        cardimg: 'cards_cxk',
      });
    } else if (options.carditem == 3) //信用卡
    {
      obj.setData({
        gded_txt: '固定额度',
        gded_hide: 'block',
        yyed_hide: 'block',
        kyed_hide: 'block',
        zdr_hide: 'block',
        hkr_hide: 'block',
        yhkh_hide: 'block',
        cardimg: 'cards_xyk',
      });
    } else if (options.carditem == 4) //储值卡
    {
      obj.setData({
        gded_txt: '余额',
        kyed_hide: 'block',
        yhkh_hide: 'block',
        cardimg: 'cards_czk',
      });
    } else if (options.carditem == 5) //在线支付/现金
    {
      obj.setData({
        gded_txt: '余额',
        gded_hide: 'block',
        cardimg: 'cards_xjzh',
      });
    }

  },

  // 页面方法
  delcard: function(e) {
    console.log(e);

    wx.showModal({
      title: '提示',
      content: '您确定要删除账户？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.siteInfo.apiurl + 'mbook/DelCard', //仅为示例，并非真实的接口地址
            data: {
              cardid: e.target.dataset.cardid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
              });

              setTimeout(function() {
                wx.navigateBack({
                  delta: 1,
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  },
                  fail: function (e) {
                    console.log(e);
                  }
                })
              }, 1000);

            }
          });
        } else if (res.cancel) {}
      }
    })

  },

  // 表单提交
  formSubmit: function(e) {
    var info = e.detail.value;
    var bool = true;

    wx.showLoading({
      title: '加载中',
    })


    if (info.cardname == "") {
      bool = false;
      wx.showModal({
        title: '提示',
        content: '请输入卡片名称',
        showCancel: false
      })
    }

    console.log('form发生了submit事件，携带数据为：', JSON.stringify(e.detail.value))

    if (bool) {
      wx.request({
        url: app.siteInfo.apiurl + 'mbook/SaveCard', //仅为示例，并非真实的接口地址
        data: e.detail.value,
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          wx.hideLoading();
          console.log(res.data)

          wx.showModal({
            title: '提示',
            content: '保存成功',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                var num = getCurrentPages().length;
                wx.navigateBack({
                  delta: num == 3 ? 1 : 2,
                  success: function(e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  },
                  fail: function(e) {
                    console.log(e);
                  }
                })
              }
            },
          })
        }
      })
    } else {
      wx.hideLoading();
    }
  },



  bindPickerzhangdanri: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindPickerhuikuanri: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //输入框事件，每输入一个字符，就会触发一次  
  bindKeywordInput: function(e) {
    console.log("输入框事件")
    this.setData({
      searchKeyword: e.detail.value
    })
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
  // onShareAppMessage: function () {

  // }
})