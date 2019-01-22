var app = getApp();
var api = require('../../api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_ren:[]
  },
  toupiao:function(e){
    var that = this;
    var u_id = wx.getStorageSync("id")
    console.log(e, e.currentTarget.dataset.id)
    wx.request({
      url: api.fl_hd_tp, // 仅为示例，并非真实的接口地址
      data: {
        token:api.token,
        t_id: e.currentTarget.dataset.id,
        u_id: u_id,
        c_id: that.data.listId

      },
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("投票结果",res)
        if (res.data.msg==3){
          wx.showModal({
            title: '提示',
            content: '已经投过票了 请勿重复操作',
          })
        }else{
          wx.showLoading({
            title: '投票成功',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that =this;
    console.log(options.id);
    wx.request({
      url: api.fl_hd_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: options.id

      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          list_ren: res.data.toupiao,
          title: res.data.title,
          stop_time: res.data.stop_time,
          listId: res.data.id,
          listImg: res.data.img_url,
          idlsit: options.id
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
    wx.request({
      url: api.fl_hd_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: that.data.idlsit
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          list_ren: res.data.toupiao,
          title: res.data.title,
          stop_time: res.data.stop_time,
          listId: res.data.id,
          listImg: res.data.img_url
        })
        wx.hideLoading()
      }
    })

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