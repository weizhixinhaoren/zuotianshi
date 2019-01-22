// pages/fankui/fankui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fankuiList: [{
        id: 0,
        name: "无法打开小程序"
      },
      {
        id: 1,
        name: "小程序闪退"
      },
      {
        id: 2,
        name: "卡顿"
      },
      {
        id: 3,
        name: "黑屏白屏"
      },
      {
        id: 4,
        name: "死机"
      },
      {
        id: 5,
        name: "界面错位"
      },
      {
        id: 6,
        name: "界面加载慢"
      },
      {
        id: 7,
        name: "其他异常"
      },
      {
        id: 8,
        name: "意见与建议"
      }
    ],
  },
  fankui:function(e){
    wx.navigateTo({
      url: '../fankuiTj/fankuiTj?text=' + e._relatedInfo.anchorTargetText,
    })
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