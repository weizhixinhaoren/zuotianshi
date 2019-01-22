var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenPl: false,
    plk_id: "",
    fabu1: []
  },
  del: function(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此条动态',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var u_id = wx.getStorageSync("id")
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        page: 1,
        token: api.token,
        type: 3,
        u_id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.info)

        that.setData({
          fabu1: res.data.info
        })
      }
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
    wx.showLoading({
      title: '正在刷新',
    })
    var that = this;
    var u_id = wx.getStorageSync("id")
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        page: 1,
        token: api.token,
        type: 3,
        u_id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.info)
        wx.hideLoading()
        that.setData({
          fabu1: res.data.info
        })
      }
    })
    //关闭
    wx.stopPullDownRefresh();
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