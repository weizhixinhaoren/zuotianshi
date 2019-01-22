// pages/my/my.js
var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sc_length:'0',
    gz_length:"0",
    dt_length:"0",
    mon:"0",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 意见反馈
  navTo:function(e){
    wx.navigateTo({
      url: '../fankui/fankui',
    })
  },
  // 商务合作
  navTo1: function (e) {
    wx.navigateTo({
      url: '../hezuo/hezuo',
    })
  },
  //申请成为代理人
  navTo2:function(e){
    wx.navigateTo({
      url: '../dailiren/dailiren',
    })
  },
  // 发布的动态
  fabudongtai:function(e){
    wx.navigateTo({
      url: '../fabudongtai/fabudongtai',
    })

  },
  guanzhuTo:function(){ 
    wx.navigateTo({
      url: '../wodeguanzhu/wodeguanzhu',
    })
  },
  shoucang: function () {
    wx.navigateTo({
      url: '../shoucang/shoucang',
    })
  },
  sqzh:function(){
    wx.navigateTo({
      url: '../zhanghao/zhanghao',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
   if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
        
        that.setData({
          sc_length: res.data.info.length
        })
        
      },
      fail(res) {
        wx.showLoading({
          title: '请求失败',
          duration: 2000
        })
      }
    })
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
        console.log("关注的信息", res.data)
       
        if (res.data.info =="没有关注过"){
          that.setData({
            gz_length: 0
          })
        }else{
          that.setData({
            gz_length: res.data.info.length
          })
        }
      }
    })
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        page:1,
        type:3,
        u_id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("关注的信息", res.data.info)
        that.setData({
          dt_length: res.data.info.length
        })

      }
    })

    // 积分
    var u_id = wx.getStorageSync("id")
    wx.request({
      url: api.index.user_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.user.mon)
        that.setData({
          mon: res.data.user.mon
        })
      }
    })
  
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
        that.setData({
          sc_length: res.data.info.length
        })
      },
      fail(res) {
        wx.showLoading({
          title: '请求失败',
          duration: 2000
        })
      }
    })

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
        console.log("关注的信息", res.data)

        if (res.data.info == "没有关注过") {
          that.setData({
            gz_length: 0
          })
        } else {
          that.setData({
            gz_length: res.data.info.length
          })
        }
      }
    })
    // 积分
    var u_id = wx.getStorageSync("id")
    wx.request({
      url: api.index.user_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.user.mon)
        that.setData({
          mon: res.data.user.mon
        })
      }
    })
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
        that.setData({
          sc_length: res.data.info.length
        })
      },
      fail(res) {
        wx.showLoading({
          title: '请求失败',
          duration: 2000
        })
      }
    })

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
        console.log("关注的信息", res.data)

        if (res.data.info == "没有关注过") {
          that.setData({
            gz_length: 0
          })
        } else {
          that.setData({
            gz_length: res.data.info.length
          })
        }
      }
    })
    // 积分
    var u_id = wx.getStorageSync("id")
    wx.request({
      url: api.index.user_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.user.mon)
        that.setData({
          mon: res.data.user.mon
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