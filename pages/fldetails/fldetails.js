var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let cont =``;
    wx.request({
      url: api.fl_hd_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success(res) {
        that.setData({
          content: res.data,
          idcon: options.id
        })
        cont = that.data.content.content;
        WxParse.wxParse('article', 'html', cont, that, 25);
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
    
    var that = this;
    that.setData({
      content:{}
    })
    let cont = ``;
    wx.request({
      url: api.fl_hd_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: that.data.idcon
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // 默认值
      },
      method: "POST",
      success(res) {
        that.setData({
          content: res.data
        })
        cont = that.data.content.content;
        WxParse.wxParse('article', 'html', cont, that, 25);
        wx.hideLoading()
      }
    })
    //关闭
    wx.stopPullDownRefresh();


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