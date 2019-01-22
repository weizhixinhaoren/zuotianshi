// pages/welfare/welfare.js
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fuliList:[]
  },
  fuli:function(e){
    console.log(e, e.currentTarget.dataset.type);
    if (e.currentTarget.dataset.type==2){
      wx.navigateTo({
        url: '../fltoupiao/fltoupiao?id=' + e.currentTarget.dataset.id,
      })
    }else{
      wx.navigateTo({
        url: '../fldetails/fldetails?id=' + e.currentTarget.dataset.id,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    xiala.request.call(that,api.fl_hd, function (data) {
      that.setData({
        fuliList: data.data
      })
      console.log("福利",data);
    })

    // 获取当前时间
    var nowTime = 1548061500835;
    var nowtime2 = (new Date()).valueOf();
    if (nowtime2 > nowTime){
        console.log("已结束")
    }else{
        console.log("进行中")
    }
    
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
    wx.showLoading({
      title: '正在刷新...',
    })
    that.setData({
      fuliList: []
    })
    xiala.request.call(that, api.fl_hd, function (data) {
      that.setData({
        fuliList: data.data
      })
      wx.hideLoading()
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