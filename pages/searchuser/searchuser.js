var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
  },

  formSubmit: function (e) {
    wx.showLoading({
      title: '搜索ing',
    })
    var that = this;
    var formData = e.detail.value.id; //获取表单所有name=id的值  
    console.log(e);
    wx.request({
      url: api.user_list, // 仅为示例，并非真实的接口地址
      data: {
        token:api.token,
        // title: this.data.inputVal,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:"post",
      success(res) {
        console.log("搜索",res)
        that.setData({
          usergj: res.data.user
        })
        wx.hideLoading()
      }
    })
  },
  gz:function(e){
    var u_id = wx.getStorageSync("id")
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: api.gz, // 仅为示例，并非真实的接口地址
      data: {
        u_id: u_id,
        g_id: e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
       
          wx.showModal({
            title: '提示',
            content: '关注成功' ,
            success:function(e){
              //返回上一级关闭当前页面
              wx.navigateBack({
                delta: 1
              })

            }
          })
      
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
 
 

  //搜索框

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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
  onShareAppMessage: function () {

  }
})