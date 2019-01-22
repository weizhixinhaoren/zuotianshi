var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submithidden: false,
    sex: 1
  },
  radioChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      sex: e.detail.value
    })
  },
  // 提交表单
  formSubmit: function(e) {
    // console.log(e)
    var name = e.detail.value.name;
    var sex = this.data.sex;
    var gongsi = e.detail.value.gongsi;
    var lxfs = e.detail.value.lxfs;
    var bz = e.detail.value.bz;
    if (name == '' || sex == "" || gongsi == "" || lxfs == '' || bz == '') {
      wx.showLoading({
        title: '输入不能为空',
        duration: 2000
      })
    } else {
      wx.request({
        url: api.hezuo, // 仅为示例，并非真实的接口地址
        data: {
          token: api.token,
          name: name,
          sex: sex,
          gsname: gongsi,
          tel: lxfs,
          content: bz,
          type: 1
        },
        method: "post",
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data.msg == 1) {
            wx.showLoading({
              title: '正在提交',
              duration:1500
            })
            wx.navigateTo({
              url: '../msg/msg',
            })

          }
        },
        fail:function(){
          wx.showLoading({
            title: '网络不好',
            duration:2000
          })
        }
      })

    }


  },
  // 姓名不为空时提交按钮
  changesub: function(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        submithidden: true
      })
    } else {
      this.setData({
        submithidden: false
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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