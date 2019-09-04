// pages/mbook/addwater.js
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid: '',
    nav_color1: 'nav-active',
    nav_color2: '',
    nav_item: 2,
    nav_icon: '',
    nav_name: '',
    tagid: 0,
    money: '',
    remark: '',
    iconlist: {},
    date: util.formatDate(new Date),
    tag_action_id: 0,
    tag_action_color: "",
    cardarray: null,
    cardindex: 0,
    id: 0,//流水ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var obj = this;
    var _model = options.model;

    if (_model == 1) { // 修改初始化数据
      var _mdetail = JSON.parse(options.mdetail);

      obj.setData({
        id: _mdetail.id,
        nav_item: _mdetail._type,
        nav_color1: _mdetail._type == 1 ? "" : "nav-active",
        nav_color2: _mdetail._type == 1 ? "nav-active" : "",
        money: _mdetail.money,
        remark: _mdetail.remark,
        cardindex: _mdetail.cardindex
      });
    }

    if (app.globalData.openid && app.globalData.openid != '') {
      this.setData({
        _openid: app.globalData.openid,
      });
    } else {
      app.openidCallback = openid => {
        console.log("_11 = " + openid);

        if (openid != '') {
          obj.setData({
            _openid: openid
          });
        }
        console.log("_openid1 = " + obj.data._openid);
      }
    }

    console.log("_openid2 = " + obj.data._openid);

    try {
      wx.request({
        url: app.siteInfo.apiurl + 'mbook/GetSystemConfig',
        data: { key: 'IconVersions' },
        header: { 'content-type': 'application/json' },
        success: function (res) {
          var _IconVersions = wx.getStorageSync('iconVersions');
          console.log("缓存版本:" + _IconVersions + ",线上版本:" + res.data.message);
          if (_IconVersions != res.data.message) {
            wx.removeStorage({ key: 'iconlist_out' });
            wx.removeStorage({ key: 'iconlist_in' });
            console.log("iconlist cache remove");
          }
        }
      });

      var _iconlist = obj.data.nav_item == 2 ? wx.getStorageSync('iconlist_out') : wx.getStorageSync('iconlist_in');
      if (_iconlist) {
        console.log("icon cache get");

        if (_model == 1) { //修改默认数据
          obj.setData({
            iconlist: _iconlist,
            nav_icon: _mdetail.tagimg,
            nav_name: _mdetail.tag,
            tagid: _mdetail.tagid,
            tag_action_id: _mdetail.tagid,
            tag_action_color: _mdetail.tagbg,
          });
        } else {
          obj.setData({
            iconlist: _iconlist,
            nav_icon: _iconlist[0].icon,
            nav_name: _iconlist[0].name,
            tagid: _iconlist[0].id,
            tag_action_id: _iconlist[0].id,
            tag_action_color: _iconlist[0].iconcolor,
          });
        }
      } else {
        console.log("icon url get");
        wx.request({
          url: app.siteInfo.apiurl + '/mbook/GetIconsByInOut', //仅为示例，并非真实的接口地址
          data: {
            user: app.globalData.openid,
            yearmonth: obj.data.yearmonth
          },
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res.data);
            if (_model == 1) { //修改默认数据
              obj.setData({
                iconlist: res.data.message.iconout,
                nav_icon: _mdetail.tagimg,
                nav_name: _mdetail.tag,
                tagid: _mdetail.tagid,
                tag_action_id: _mdetail.tagid,
                tag_action_color: _mdetail.tagbg,
              });
            } else {
              obj.setData({
                iconlist: res.data.message.iconout,
                nav_icon: res.data.message.iconout[0].icon,
                nav_name: res.data.message.iconout[0].name,
                tagid: res.data.message.iconout[0].id,
                tag_action_id: res.data.message.iconout[0].id,
                tag_action_color: res.data.message.iconout[0].iconcolor,
              });
            }
            wx.setStorage({
              key: "iconVersions",
              data: res.data.Versions,
              success: function (res) {
                console.log('缓存(iconVersions)成功')
              }
            });

            wx.setStorage({
              key: "iconlist_out",
              data: res.data.message.iconout,
              success: function (res) {
                console.log('缓存(iconlist_out)成功')
              }
            });
            wx.setStorage({
              key: "iconlist_in",
              data: res.data.message.iconin,
              success: function (res) {
                console.log('缓存(iconlist_in)成功')
              }
            });
          }
        });
      }
    } catch (e) {

    }

    // 获取卡片详情
    wx.request({
      url: app.siteInfo.apiurl + '/mbook/GetCardList',
      data: { user: app.globalData.openid },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var cardlist = res.data.message;
        //console.log(cardlist);
        var _cardarray = [];
        _cardarray.push({
          id: 0,
          value: 0,
          name: "选择账户"
        });
        for (var i = 0; i < cardlist.length; i++) {
          _cardarray.push({
            id: i + 1,
            value: cardlist[i].id,
            name: cardlist[i].cardname
          });
        }
        obj.setData({
          cardarray: _cardarray,
        });
        console.log(_cardarray);
      }
    });

  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      date: e.detail.value
    })
  },

  // 选择银行卡
  bindCardsChange: function (e) {
    console.log(e);
    this.setData({
      cardindex: e.detail.value,
      cardid: this.data.cardarray[e.detail.value].value
    })
  },

  // 点击菜单
  jizhangmenu: function (e) {
    var obj = this;
    var item = e.target.dataset.item;
    if (item == 1) {
      obj.setData({
        nav_color1: '',
        nav_color2: 'nav-active',
      })
    } else {
      obj.setData({
        nav_color1: 'nav-active',
        nav_color2: '',
      })
    }

    var _iconlist = item == 2 ? wx.getStorageSync('iconlist_out') : wx.getStorageSync('iconlist_in');

    obj.setData({
      iconlist: _iconlist,
      nav_item: item,
      nav_icon: _iconlist[0].icon,
      nav_name: _iconlist[0].name,
      tagid: _iconlist[0].id,
      tag_action_id: _iconlist[0].id,
      tag_action_color: _iconlist[0].iconcolor,
    });

    console.log('选择菜单', item)
  },

  // tag点击
  clickimgs: function (e) {
    var obj = this;
    console.log(e);

    obj.setData({
      nav_icon: e.currentTarget.dataset.tagicon,
      nav_name: e.currentTarget.dataset.tagname,
      tagid: e.currentTarget.dataset.tagid,
      tag_action_id: e.currentTarget.dataset.tagid,
      tag_action_color: e.currentTarget.dataset.tagcolor,
    });
  },

  // 保存
  formSubmit: function (e) {
    var obj = this;
    // 参数
    var info = e.detail.value;
    console.log(info);
    var bool = true;
    // 按钮属性
    var _btnsive = e.detail.target.dataset.btn;
    var formid = e.detail.formId;

    console.log(formid);

    if (info.money == "") {
      bool = false;
      wx.showToast({
        title: '请记录金额',
        duration: 2000
      });
    }

    if (bool) {
      console.log(e.detail.value);
      wx.request({
        url: app.siteInfo.apiurl + '/mbook/savemoneywater?formid=' + formid,
        data: e.detail.value,
        header: { 'content-type': 'application/json' },
        success: function (res) {

          console.log(res.data);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
          });

          if (_btnsive == 1) {
            setTimeout(function () {
              obj.setData({
                money: ''
              });
              obj.onLoad();
            }, 1000);
          } else {
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
        }
      })
    } else {

    }
  },

  // 保存再记
  btnsives: function (e) {
    console.log(e);
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
  // onShareAppMessage: function () {

  // }
})