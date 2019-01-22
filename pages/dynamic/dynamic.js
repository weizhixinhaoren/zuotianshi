// pages/dynamic/dynamic.js
var app = getApp();
var area = require('../../utils/area.js');
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
var areaInfo = []; //所有省市区县数据
var provinces = []; //省
var citys = []; //城市
var countys = []; //区县
var index = [0, 0, 0];
var cellId;
var t = 0;
var show = false;
var moveY = 200;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: show,
    provinces: provinces,
    citys: citys,
    countys: countys,
    value: [0, 0, 0],
    array: ['admin'],
    fbImg: [],
    img_arr: [], //需要上传的图片
    chooesVideo: [], //需要上传的视频
    hiddenthr: false,
    type: 1
  },
  //上传视频
  chooseVideo: function() {
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function(res) {
        that.setData({
          chooesVideo: res.tempFilePath,
          type: 2
        })
      }
    })
  },
  // 提交表单
  formSubmit: function(e) {
    var that = this
    console.log(e, e.detail.value.xf);
    // 上传图片
    if (that.data.type == 1) {
      for (var i = 0; i < this.data.img_arr.length; i++) { //循环遍历图片 
        wx.uploadFile({
          url: api.up_file, //自己的接口地址
          filePath: that.data.img_arr[i],
          name: 'file',
          formData: ({ //上传图片所要携带的参数
            userName: "file",
            token: api.token,
          }),
          method: "post",
          success: function(res) {
            // var data = JSON.parse(res)
            console.log(res);
            that.setData({
              fbImg: that.data.fbImg + res.data + ",",
              type: 1,
            })
            wx.showLoading({
              title: '正在发布',
            })
            var xf = e.detail.value.xf
            wx.request({
              url: api.shequ_fb, // 仅为示例，并非真实的接口地址
              data: {
                token: api.token,
                content: xf,
                url: that.data.fbImg,
                u_id: that.data.id_user,
                stu: 2
              },
              method: "post",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success(res) {
                console.log(res.data);
                wx: wx.hideLoading();
               
                wx.showModal({
                  title: '提示',
                  content: '等待管理员审核',
                  success:function(){
                    wx.switchTab({
                      url: '/pages/community/community',
                    })   
                                     
                  }
                })
              }
            })
          }
        })
      }
    }
     // 上传视频
    if (that.data.type == 2) {
      wx.uploadFile({
        url: api.up_file, //自己的接口地址
        filePath: that.data.chooesVideo,
        name: 'file',
        formData: ({ //上传图片所要携带的参数
          userName: "file",
          token: api.token,
        }),
        method: "post",
        success: function(res) {
          // var data = JSON.parse(res)
          console.log(res);
          that.setData({
            chooesVideoUp: res.data
          })
          wx.showLoading({
            title: '正在发布',
          })
          var xf = e.detail.value.xf
          wx.request({
            url: api.shequ_fb, // 仅为示例，并非真实的接口地址
            data: {
              token: api.token,
              content: xf,
              url: that.data.chooesVideoUp,
              u_id: that.data.id_user,
              stu: 1
            },
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log(res.data);
              wx: wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '等待管理员审核',
                success: function () {
                  wx.switchTab({
                    url: '/pages/community/community',
                  })
                }
              })
            }
          })
        }
      })

    }

  },

  upimg: function() {
    var that = this;
    that.setData({
      hiddenthr: !that.data.hiddenthr
    })
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          });

        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 2000
      });
    }
  },
  //选择账号
  bindPickerChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  //滑动事件
  bindChange: function(e) {
    var val = e.detail.value
    // console.log(e)
    //判断滑动的是第几个column
    //若省份column做了滑动则定位到地级市和区县第一位
    if (index[0] != val[0]) {
      val[1] = 0;
      val[2] = 0;
      getCityArr(val[0], this); //获取地级市数据
      getCountyInfo(val[0], val[1], this); //获取区县数据
    } else { //若省份column未做滑动，地级市做了滑动则定位区县第一位
      if (index[1] != val[1]) {
        val[2] = 0;
        getCountyInfo(val[0], val[1], this); //获取区县数据
      }
    }
    index = val;

    console.log(index + " => " + val);

    //更新数据
    this.setData({
      value: [val[0], val[1], val[2]],
      province: provinces[val[0]].name,
      city: citys[val[1]].name,
      county: countys[val[2]].name,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    cellId = options.cellId;
    var that = this;
    var date = new Date()
    //获取省市区县数据
    area.getAreaInfo(function(arr) {
      areaInfo = arr;
      //获取省份数据
      getProvinceData(that);
    });
    // 获取用户缓存的id
    wx.getStorage({
      key: 'id',
      success(res) {
        console.log(res.data)
        that.setData({
          id_user: res.data
        })
      }
    })
  },
  // ------------------- 分割线 --------------------
  onReady: function() {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 0,
      timingFunction: "ease",
      delay: 0
    })
    this.animation.translateY(200 + 'vh').step();
    this.setData({
      animation: this.animation.export(),
      show: show
    })
  },
  //移动按钮点击事件
  translate: function(e) {
    if (t == 0) {
      moveY = 0;
      show = false;
      t = 1;
    } else {
      moveY = 200;
      show = true;
      t = 0;
    }
    // this.animation.translate(arr[0], arr[1]).step();
    animationEvents(this, moveY, show);

  },
  //隐藏弹窗浮层
  hiddenFloatView(e) {
    console.log(e);
    moveY = 200;
    show = true;
    t = 0;
    animationEvents(this, moveY, show);

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

//动画事件
function animationEvents(that, moveY, show) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()

  that.setData({
    animation: that.animation.export(),
    show: show
  })

}

// ---------------- 分割线 ---------------- 

//获取省份数据
function getProvinceData(that) {
  var s;
  provinces = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    s = areaInfo[i];
    if (s.di == "00" && s.xian == "00") {
      provinces[num] = s;
      num++;
    }
  }
  that.setData({
    provinces: provinces
  })

  //初始化调一次
  getCityArr(0, that);
  getCountyInfo(0, 0, that);
  that.setData({
    province: "北京市",
    city: "市辖区",
    county: "东城区",
  })

}

// 获取地级市数据
function getCityArr(count, that) {
  var c;
  citys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian == "00" && c.sheng == provinces[count].sheng && c.di != "00") {
      citys[num] = c;
      num++;
    }
  }
  if (citys.length == 0) {
    citys[0] = {
      name: ''
    };
  }

  that.setData({
    city: "",
    citys: citys,
    value: [count, 0, 0]
  })
}

// 获取区县数据
function getCountyInfo(column0, column1, that) {
  var c;
  countys = [];
  var num = 0;
  for (var i = 0; i < areaInfo.length; i++) {
    c = areaInfo[i];
    if (c.xian != "00" && c.sheng == provinces[column0].sheng && c.di == citys[column1].di) {
      countys[num] = c;
      num++;
    }
  }
  if (countys.length == 0) {
    countys[0] = {
      name: ''
    };
  }
  that.setData({
    county: "",
    countys: countys,
    value: [column0, column1, 0]
  })
}