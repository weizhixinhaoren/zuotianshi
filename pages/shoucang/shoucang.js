var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: [],
    selectilall: false,
    list: [],
    delarr: {}
  },
  //跳转到详情
  navTodetails:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  //单选
  select: function(e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;
    let list = this.data.list
    let newli = 'list[' + index + '].checked';
    this.setData({
      [newli]: !this.data.list[index].checked
    })
    let li2 = this.data.list[index].checked
    if (li2 == false) {
      for (let i in this.data.select) {
        if (this.data.select[i] == selectValue) {
          this.data.select.splice(i, 1);
        }
      }
    } else {
      this.data.select.push(selectValue);
    }
    console.log(this.data.select)
    this.setData({
      delarr: this.data.select
    })
  },
  //全选，取消全选
  selectAll: function(e) {
    let list = this.data.list;
    let selectilall = this.data.selectilall;
    if (selectilall == false) {
      for (let i = 0; i < list.length; i++) {
        let newli = 'list[' + i + '].checked';
        //carts[i].selected = this.data.selectedAllStatus;
        //this.data.select.push(this.data.list[i].id);
        this.setData({
          //[newli]: !this.data.list[i].checked
          [newli]: true,
          selectilall: true
        })
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        let newli = 'list[' + i + '].checked';
        //carts[i].selected = this.data.selectedAllStatus;
        //this.data.select.push(this.data.list[i].id);
        this.setData({
          //[newli]: !this.data.list[i].checked
          [newli]: false,
          selectilall: false
        })
      }
    }

    console.log(list);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.sc_sp, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        u_id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data.info
        })
      },
      fail(res) {
        wx.showLoading({
          title: '请求失败',
          duration: 2000
        })
      }
    })
  },
  //删除
  // del: function(e) {
  //   var u_id = wx.getStorageSync("id")
  //   wx.request({
  //     url: api.qx_sc, // 仅为示例，并非真实的接口地址
  //     data: {
  //       token: api.token,
  //       sp_id: 33,
  //       u_id: u_id
  //     },
  //     method: 'post',
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       console.log("删除", res)
  //     }
  //   })
  // },
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
    var that = this
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.sc_sp, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        u_id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          list: res.data.info
        })
        wx.hideLoading()
      },
      fail(res) {
        wx.showLoading({
          title: '请求失败',
          duration: 2000
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