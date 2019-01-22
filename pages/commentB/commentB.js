var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var u_id = wx.getStorageSync("id");
    console.log(options.id);
    that.setData({
      comId: options.id
    })
  },
  bindblur: function(e) {
    
    var bindblur = e.detail.value;
    this.setData({
      bindblur: bindblur
    })
  },
  btn_send: function(e) {
    var that = this
    //添加评论
    var u_id = wx.getStorageSync("id");
    console.log("sss",that.data.bindblur)
    if (that.data.bindblur !== undefined){
      wx.request({
        url: api.index_sp_operation,
        method: 'POST',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        data: {
          token: api.token,
          lx: 3,
          sp_id: that.data.comId,
          u_id: u_id,
          content: that.data.bindblur,
        },
        success: function (result) {
          that.setData({
            input_value: "",
            bindblur:"",
          })
          console.log(result)
          wx.showLoading({
            title: '评论成功',
            duration:2000,
            success:function(){
              wx.navigateBack({
                delta: 1
              });
            }
          })
        },
        fail: res => {
          wx.showToast({
            title: '网络不好哟',
            type: 'none',
            duration: 3000
          })
        }
      })
    }else{
      wx.showLoading({
        title: '评论不能为空',
        duration:2000
      })
    }
   
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