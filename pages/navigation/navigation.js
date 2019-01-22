// pages/navigation/navigation.js
var app = getApp();
var xiala = require('../../utils/url.js');
var api = require('../../api.js');
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[]
  },
 
  //评论
  comPl: function (e) {
    console.log("评论的id", e.currentTarget.id);
    wx.navigateTo({
      url: '../commentB/commentB?id=' + e.currentTarget.id,
    })
  },
  //收藏
  inshouc: function (event) {
    // 获取当前点击下标
    var user_id = wx.getStorageSync("id")
    console.log(event)
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.videoList;
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
      videoList: message
    })
  },
  //点赞
  update_zan: function (event) {
    // 获取当前点击下标
    var user_id = wx.getStorageSync("id")
    console.log(event)
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.videoList;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        if (message[i].stu.dz == 0) { //如果是没点赞+1
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
      videoList: message
    })
  },
  // 转发生成二维码
  fenxiang: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../fxewm/fxewm?id =' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function(options) {
    console.log(options);
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.index.index_sp, // 仅为示例，并非真实的接口地址
      data: {
        page,
        token: api.token,
        lm_id: options.id,
        id: u_id
      },
      header: {
        // 默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res) {
        console.log(res);
        wx.hideLoading()
        if (res.data.msg ==2){
            wx.showModal({
              title: '提示',
              content: '暂无数据 敬请期待！',
              success:function(){
                wx.navigateBack({
                  delta: 1  // 返回上一级页面。
                })
              }
            })
        }else{
          var data = res.data.info;
          wx.hideLoading();
          that.setData({
            videoList: that.data.videoList.concat(data),
            idcon: options.id,
            fmUrl: res.data.lm_info.fm_url,
            numAll: res.data.lm_info.num
          })
        }
        
      },
    })
  },
  navTo: function(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.id,
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
      title: '正在加载...',
    })
    var that = this;
    var u_id = wx.getStorageSync("id");
    wx.request({
      url: api.index.index_sp, // 仅为示例，并非真实的接口地址
      data: {
        page:1,
        token: api.token,
        lm_id: that.data.idcon,
        id: u_id
      },
      header: {
        // 默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res) {
        console.log(res);
        wx.hideLoading()
        var data = res.data.info;
        wx.hideLoading();
        that.setData({
          videoList: data,
          fmUrl: res.data.lm_info.fm_url,
          numAll: res.data.lm_info.num

        })

      },
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (options) {
    wx.showLoading({
      title: '正在加载...',
     
    })
    var u_id = wx.getStorageSync("id");
    var that = this;
    page = page+1;
    wx.request({
      url: api.index.index_sp, // 仅为示例，并非真实的接口地址
      data: {
        page,
        token: api.token,
        lm_id: that.data.idcon,
        id: u_id
      },
      header: {
        // 默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        if (res.data.msg == 0) {
          wx.showLoading({
            title: '暂无数据...',
            duration: 2000
          })
        } 
        else
         {
          var data = res.data.info;
          wx.hideLoading();
          that.setData({
            videoList: that.data.videoList.concat(data)
          })
        }
      },
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})