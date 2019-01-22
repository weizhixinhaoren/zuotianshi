var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    jjImg: "../../images/sjt.png",
    jjImgH: "../../images/xjt.png",
    autoplay: true,
    content: {},
    comment:[]

  },
  //分享二维码
  fenxiang: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../fxewm/fxewm?id =' + e.currentTarget.id,
    })
  },
  // 点赞
  update_zan: function (res) {
    console.log(res);
    var user_id = wx.getStorageSync("id");
    var that = this
    // console.log(res, res.currentTarget.id, that.data.id_user)
    wx.request({
      url: api.index_sp_operation, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        lx: 1,
        sp_id: res.currentTarget.id,
        u_id: user_id,

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "post",
      success(res) {
        console.log(res);
        wx.showLoading({
          title: '已点赞',
          duration: 2000
        })
        var u_id = wx.getStorageSync("id");
        wx.request({
          url: api.index.index_sp_info, // 仅为示例，并非真实的接口地址
          data: {
            token: api.token,
            sp_id: that.data.optionsId,
            u_id: u_id
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log("内容页", res)

            var xq = res.data.sp_info;
            that.setData({
              content: xq,
              comment: res.data.comment
            })
          }
        })

      }
    })


  },
  //收藏
  inshouc: function (res) {
    var user_id = wx.getStorageSync("id");
    var that = this
    // console.log(res, res.currentTarget.id, that.data.id_user)
    wx.request({
      url: api.index_sp_operation, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        lx: 2,
        sp_id: res.currentTarget.id,
        u_id: user_id,

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "post",
      success(res) {
        console.log(res);
        wx.showLoading({
          title: '已收藏',
          duration: 2000
        })
        var u_id = wx.getStorageSync("id");
        wx.request({
          url: api.index.index_sp_info, // 仅为示例，并非真实的接口地址
          data: {
            token: api.token,
            sp_id: that.data.optionsId,
            u_id: u_id
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log("内容页", res)

            var xq = res.data.sp_info;
            that.setData({
              content: xq,
              comment: res.data.comment
            })
          }
        })
      }
    })
  },
  tabHs: function(e) {
    this.setData({
      hidden: !this.data.hidden
    });

  },
  navTo: function(e) {
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../commentB/commentB?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function(options) {
    console.log(options);
    var that = this;
    // 查找用户
    var u_id= wx.getStorageSync("id");
    console.log("用户id", u_id)
    wx.request({
      url: api.index.user_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id,
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("用户", res)
        that.setData({
          userImg: res.data.user.img_url,
          user_name: res.data.user.name,
          optionsId: options.id,
        })
      }
    })
    wx.request({
      url: api.index.index_sp_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        sp_id: options.id,
        u_id: u_id
      },
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("内容页",res)

        var xq = res.data.sp_info;
        that.setData({
          content: xq,
          comment: res.data.comment
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
    var that = this;
    // 查找用户
    var u_id = wx.getStorageSync("id");
    console.log("用户id", u_id)
    wx.request({
      url: api.index.user_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id,
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("用户", res)
        that.setData({
          userImg: res.data.user.img_url,
          user_name: res.data.user.name,
        })
      }
    })
    wx.request({
      url: api.index.index_sp_info, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        sp_id: that.data.optionsId,
        u_id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("内容页", res)

        var xq = res.data.sp_info;
        that.setData({
          content: xq,
          comment: res.data.comment
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