var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    searchRecord: []
  },

  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [],//若无储存则为空
    })
  },
  
  //跳转到详情
  navTodeail: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '搜索ing',
    })
    var u_id = wx.getStorageSync("id")
    var that = this;
    var formData = e.detail.value.id; //获取表单所有name=id的值  
    console.log(e);
    wx.request({
      url: api.index_sp_ss, // 仅为示例，并非真实的接口地址
      data: {
        token:api.token,
        title: this.data.inputVal,
        id: u_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:"post",
      success(res) {
        console.log("搜索",res.data)
        that.setData({
          listArr: res.data.info
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openHistorySearch()
  },
  //点击搜索按钮提交表单跳转并储存历史记录
  searchSubmitFn: function (e) {
    var that = this
    var inputVal = e.detail.value.input
    var searchRecord = this.data.searchRecord
    if (inputVal == '') {
      //输入为空时的处理
     wx.showModal({
       title: '提示',
       content: '请输入有效的关键字',
     })
    }
    else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 6) {
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      else {
        searchRecord.pop()//删掉旧的时间最早的第一条
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord);
      //调取搜索的接口
   
    }
  },
  // 点击垃圾桶删除浏览记录
   historyDelFn: function() {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
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