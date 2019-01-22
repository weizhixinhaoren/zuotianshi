var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenImg:false,
    inputShowed: false,
    inputVal: "",
    imgUrls: [], //banner
    indicatorColor: "rgba(0, 0, 0, .3)",
    indicatorActiveColor: "#ffffff", //当前指示器的颜色
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    // //收藏图片
    // img_sc:'../../images/shou-h.png',
    // // 未收藏
    // img_sc_w: '',
    // 导航
    navList: [],
    //浏览数据recent
    recent: [],
    //热门推荐
    hotBoxlist: [],
    //精选视频
    jingxuanvideo: []

  },

  details: function(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  navTobe: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  // 转发生成二维码
  fenxiang: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../fxewm/fxewm?id =' + e.currentTarget.id,
    })
  },
  //评论
  comPl:function(e){
    console.log("评论的id",e.currentTarget.id);
    wx.navigateTo({
      url: '../commentB/commentB?id='+ e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取用户缓存的id
    var that = this
    var user_id = wx.getStorageSync("id");
    that.setData({
      user_id:user_id
    })
    console.log("用户id", user_id)
    
    wx.showLoading({
      title: '正在加载',
      duration: 2000
    });
    // banner
    xiala.request.call(that, api.index.banner, function(data) {
      that.setData({
        imgUrls: data.data
      })
    })
    // 导航
    xiala.request.call(that, api.index.index_nav, function(data) {
      that.setData({
        navList: data.data
      })
    })
    // 视频
    var user_id = wx.getStorageSync("id");
    xiala.requestVid.call(that, api.index.index_sp, user_id,1, function(data) {
      that.setData({
        jingxuanvideo: data.data.info
      })
     
    })
    //推荐
    xiala.request.call(that, api.index.index_tj, function(data) {
      that.setData({
        hotBoxlist: data.data
      })
    })
   
    
  },
//收藏
  inshouc:function(event){
    // 获取当前点击下标
    var user_id = wx.getStorageSync("id")
    console.log(event)
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.jingxuanvideo;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        if (message[i].stu.sc == 0) { //如果是没点赞+1
          message[i].stu.sc = parseInt(message[i].stu.sc) + 1

          wx.request({
            url: api.index_sp_operation, // 仅为示例，并非真实的接口地址
            data: {
              token: api.token,
              lx: 2,
              sp_id: event.currentTarget.id,
              u_id: user_id,

            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: "post",
            success(res) {
              console.log("赞", res);
              wx.showLoading({
                title: '已点赞',
                duration: 2000
              })

            }
          })
          // message[i].dzzs = parseInt(message[i].dzzs) + 1   点赞总数
        } else {
          message[i].stu.sc = parseInt(message[i].stu.sc) - 1
          wx.showLoading({
            title: '取消点赞',
            duration: 2000
          })
          // message[i].dzzs = parseInt(message[i].dzzs) - 1
        }
      }
    }
    this.setData({
      jingxuanvideo: message
    })
  },
//点赞
  update_zan: function (event) {
    var user_id = wx.getStorageSync("id")
    console.log(event)
    var index = event.currentTarget.dataset.index;
    var message = this.data.jingxuanvideo;
    for (let i in message) { 
      if (i == index) { 
        if (message[i].stu.dz == 0) { 
          message[i].stu.dz = parseInt(message[i].stu.dz) + 1
         
          wx.request({
            url: api.index_sp_operation, // 仅为示例，并非真实的接口地址
            data: {
              token: api.token,
              lx: 1,
              sp_id: event.currentTarget.id,
              u_id: user_id,

            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: "post",
            success(res) {
              console.log("赞", res);
              wx.showLoading({
                title: '已点赞',
                duration: 2000
              })

            }
          })
          // message[i].dzzs = parseInt(message[i].dzzs) + 1   点赞总数
        } else {
          message[i].stu.dz = parseInt(message[i].stu.dz) - 1
          wx.showLoading({
            title: '取消点赞',
            duration: 2000
          })
          // message[i].dzzs = parseInt(message[i].dzzs) - 1
        }
      }
    }
    this.setData({
      jingxuanvideo: message
    })
  },


  onShareTap: function (event) {
    wx.clearStorageSync();
  },
  //搜索跳转页面
  searchTo: function() {
    wx.navigateTo({
      url: '../search/search',
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
    console.log("onShow")
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
      title: '正在刷新...',
    })
    var that = this;
    // banner
    xiala.request.call(that, api.index.banner, function (data) {
      that.setData({
        imgUrls: data.data
      })
      wx.hideLoading()
    })
    // 导航
    xiala.request.call(that, api.index.index_nav, function (data) {
      that.setData({
        navList: data.data
      })
      wx.hideLoading()

    })
  
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    var that = this;
    // 调出模态框
    wx.showLoading({
      title: '玩命加载中',
    })
    //页面加1  翻页状态 到下一页
    page = page + 1;
    xiala.wxrequest.call(that, api.index.index_sp, that.data.user_id, page, function(data) {
      wx.hideLoading();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})