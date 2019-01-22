const app = getApp();
const api = require('../../api.js');
const xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList:[]
  },
  qxgz:function(e){
    console.log(e.target.dataset.id);
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.qx_gz, // 仅为示例，并非真实的接口地址
      data: {
        u_id: u_id,
        g_id: e.target.dataset.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: "已取消关注",
          success:function(){
            wx.navigateBack({ changed: true });//返回上一页
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.gz_list, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("我的关注", res.data)
        if (res.data.info =='没有关注过'){
            wx.showModal({
              title: '提示',
              content: '没有关注过',
              success:function(){
                wx.navigateBack({ changed: true });//返回上一页
              }
            })
        }else{
          that.setData({
            infoList: res.data.info
          })
        }
        

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
    wx.showLoading({
      title: '正在刷新',
    })
    var that = this
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.gz_list, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("我的关注", res.data)
        if (res.data.info == '没有关注过') {
          wx.showModal({
            title: '提示',
            content: '没有关注过',
            success: function () {
              wx.navigateBack({ changed: true });//返回上一页
            }
          })
        } else {
          wx.hideLoading()
          that.setData({
            infoList: res.data.info
          })
        }
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