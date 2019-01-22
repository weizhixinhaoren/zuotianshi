// pages/community/community.js
var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
var sliderWidth = 42;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 评论框显示与否
    hiddenPl:false,
    plk_id:"",
    tabs: ["关注", "广场"],
    hideHeader: false,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 关注的账号
    gzList: [],
    // 发布的信息列表
    infoList: [],
    guanginfoList: [],
  },
  searchuser:function(e){
    wx.navigateTo({
      url: '../searchuser/searchuser',
    })
  },
  navTozh: function(e) {
    wx.navigateTo({
      url: '../zhanghao/zhanghao',
    })
  },
  fenxiang: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../fxewmsq/fxewmsq?id =' + e.currentTarget.id,
    })
  },
  // 评论
  plcont:function(e){
    console.log("评论id", e.currentTarget.id);
    this.setData({
      hiddenPl: !this.data.hiddenPl,
      plk_id : e.currentTarget.id
    })

  },
  //点赞
  zanUp: function (event) {
    // 获取当前点击下标
    var user_id = wx.getStorageSync("id")
    console.log(event)
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.infoList;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        if (message[i].stu.dz == 0) { //如果是没点赞+1
          message[i].stu.dz = parseInt(message[i].stu.dz) + 1

          wx.request({
            url: api.shequ_sp_operation, // 仅为示例，并非真实的接口地址
            data: {
              token: api.token,
              lx: 1,
              dy_id: event.currentTarget.id,
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
      infoList: message
    })
  },
  zanUp1: function (event) {
    // 获取当前点击下标
    var user_id = wx.getStorageSync("id")
    console.log(event)
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.guanginfoList;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        if (message[i].stu.dz == 0) { //如果是没点赞+1
          message[i].stu.dz = parseInt(message[i].stu.dz) + 1

          wx.request({
            url: api.shequ_sp_operation, // 仅为示例，并非真实的接口地址
            data: {
              token: api.token,
              lx: 1,
              dy_id: event.currentTarget.id,
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
      guanginfoList: message
    })
  },
  //发送
  formSubmit:function(e){
    console.log(e.detail.target.dataset.id);
    var that = this
    var u_id = wx.getStorageSync("id");
    if (e.detail.value.content.length == 0){
      wx.showLoading({
        title: '评论不能为空',
        duration:2000
      })
    }else{
      wx.request({
        url: api.shequ_sp_operation,
        method: 'POST',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          token: api.token,
          lx: 3,
          dy_id: e.detail.target.dataset.id,
          u_id: u_id,
          content: e.detail.value.content
        },
        success: function (result) {
          that.setData({
            input_value: "",
            onblur_con: "",
            hiddenPl: false
          })
          console.log(result)
          wx.showLoading({
            title: '评论成功',
            duration: 2000
          })

          var u_id = wx.getStorageSync("id");
          wx.request({
            url: api.shequ_sp, // 仅为示例，并非真实的接口地址
            data: {
              type: 1,
              page: 1,
              token: api.token,
              u_id: u_id
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log("广场", res)

              if (res.data.msg == "0") {
                that.setData({
                  guanginfoList: ""
                })
              } else {
                that.setData({
                  guanginfoList: res.data.info
                })
              }
            }
          })
          that.onLoad();
        },
        fail: res => {
          wx.showToast({
            title: '网络不好哟',
            type: 'none',
            duration: 3000
          })
        }
      })
    }
   
  },
  //图片点击事件
  imgYu: function (event) {
    console.log(event);
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //点击切换TAB
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var u_id = wx.getStorageSync("id");
    var that = this;
    // 获取用户缓存的id
    wx.getStorage({
      key: 'id',
      success(res) {
        that.setData({
          id_user: res.data
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scrollHeight: res.windowHeight
        });
      }
    });
   
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        type: 1,
        page: 1,
        token: api.token,
        u_id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("广场",res)
        that.setData({
          guanginfoList: res.data.info
        })
      }
    })
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        type: 2,
        page: 1,
        token: api.token,
        u_id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("关注的信息", res.data)
        that.setData({
          infoList: res.data.info
        })
        
      }
    })
    wx.request({
      url: api.gz_list, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("关注list", res.data.info)
        that.setData({
          uesrGzInfo: res.data.info
        })
      }
    })
  },
 //预览图片
  previewImg: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.id;
    var imgArr = e.currentTarget.dataset.list;
    wx.previewImage({
      current: imgArr[index], //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //预览图片
  previewImg0: function (e) {
    console.log(e.currentTarget.dataset.list);
    console.log(e.currentTarget.dataset.id);
    var index = e.currentTarget.dataset.id;
    var imgArr = e.currentTarget.dataset.list;
    wx.previewImage({
      current: imgArr[index], //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    console.log("onshow")
    var that = this
    var u_id = wx.getStorageSync("id")
    wx.request({
      url: api.gz_list, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("关注list", res.data.info)
        that.setData({
          uesrGzInfo: res.data.info
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
    var u_id = wx.getStorageSync("id");
    var that  = this
    wx.showLoading({
      title: '正在刷新',
    })
    that.setData({
      guanginfoList:[],
      infoList:[],
      uesrGzInfo:[]
    })
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        type: 1,
        page: 1,
        token: api.token,
        u_id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.info)
        that.setData({
          guanginfoList: res.data.info
        })
        wx.hideLoading()
        //关闭
        wx.stopPullDownRefresh();
      }
    })
    // 下拉关注刷新
    wx.request({
      url: api.shequ_sp, // 仅为示例，并非真实的接口地址
      data: {
        type: 2,
        page: 1,
        token: api.token,
        u_id: u_id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("关注的信息", res.data)
        that.setData({
          infoList: res.data.info
        })

      }
    })
    wx.request({
      url: api.gz_list, // 仅为示例，并非真实的接口地址
      data: {
        token: api.token,
        id: u_id
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("关注", res.data.info)
        that.setData({
          uesrGzInfo: res.data.info
        })
        //关闭
        wx.stopPullDownRefresh();
      }
    })
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