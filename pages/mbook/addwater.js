// pages/mbook/addwater.js
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:'',//用户ID
    money:'',
    billType:'',//账单类型eg:0收入、1支出
    consumptionType:'',//消费类型
    remarks:'',//备注
    iconlist: {},//图标
    nav_color1: 'nav-active',
    nav_color2: '',
    tag_action_id: 1,
    date: util.formatDate(new Date),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;
    console.log("icon url get");
    wx.request({
      url: app.siteInfo.apiurl + '/dic/getpay', //支出图标接口地址
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.data);
        obj.setData({
          iconlist: res.data.data,
          nav_icon: res.data.data[0].content,
          nav_name: res.data.data[0].dictionaryName,
          tagid: res.data.data[0].dictionaryInfoId,
          tag_action_id: res.data.data[0].dictionaryInfoId,
          tag_action_color: res.data.data[0].sortNum,
          billType: res.data.data[0].dictionaryType,
        })
      }
    });

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
  },//onload
  // 点击菜单
  jizhangmenu: function (e) {
    var obj = this;
    var item = e.target.dataset.item;
    if (item == 0) {
      wx.request({
        url: app.siteInfo.apiurl + '/dic/getincome', //收入图标接口地址
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.log(res.data.data);
          obj.setData({
            iconlist: res.data.data,
            nav_icon: res.data.data[0].content,
            nav_name: res.data.data[0].dictionaryName,
            tagid: res.data.data[0].dictionaryInfoId,
            tag_action_id: res.data.data[0].dictionaryInfoId,
            tag_action_color: res.data.data[0].sortNum,
            billType: res.data.data[0].dictionaryType,
            nav_color1: '',
            nav_color2: 'nav-active',
          })
        }
      });
    } else {
      wx.request({
        url: app.siteInfo.apiurl + '/dic/getpay', //支出图标接口地址
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.log(res.data.data);
          obj.setData({
            iconlist: res.data.data,
            nav_icon: res.data.data[0].content,
            nav_name: res.data.data[0].dictionaryName,
            tagid: res.data.data[0].dictionaryInfoId,
            tag_action_id: res.data.data[0].dictionaryInfoId,
            tag_action_color: res.data.data[0].sortNum,
            billType: res.data.data[0].dictionaryType,
            nav_color1: 'nav-active',
            nav_color2: '',
          })
        }
      });
    };

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
      billType: e.currentTarget.dataset.dictionaryType,
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
        url: app.siteInfo.apiurl + '/bill/addbill',
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
                money: '',
                remarks:'',
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