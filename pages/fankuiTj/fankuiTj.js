var app = getApp();
var api = require('../../api.js');
var xiala = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    isAgree: false,
    files: [],
    allImg:[],
    textlength:0,
    textname:null
  },
  textlength:function(e){
    this.setData({
      textlength: e.detail.value.length
    })
   
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  formSubmit:function(e){
    var that = this 
    // 截图上传
    console.log(e);
    if (this.data.files.length>0){
      for (var i = 0; i < this.data.files.length; i++) {
        wx.uploadFile({
          url: api.up_file,//自己的接口地址
          filePath: that.data.files[i],
          name: 'file',
          formData: ({//上传图片所要携带的参数
            userName: "file",
            token: api.token,
          }),
          method: "post",
          success: function (res) {
            // var jsonObj = JSON.parse(res);
            console.log(res)
            that.setData({
              allImg: res.data
            })

            var title = e.detail.value.title;
            var tel = e.detail.value.tel;
            var textCont = e.detail.value.textCont;
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            if (!myreg.test(tel)) {
              wx.showToast({
                title: '手机号有误！',
                icon: 'none',
                duration: 1500
              })
              return false;
            } if (textCont == "") {
              wx.showToast({
                title: '描述内容不能为空',
                icon: 'none',
                duration: 1500
              })
            } else {
              wx.request({
                url: api.yijian, // 仅为示例，并非真实的接口地址
                data: {
                  token: api.token,
                  yuanyin: title,
                  tel: tel,
                  img_url: that.data.allImg
                },
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success(res) {
                  console.log(res.data);
                  wx.showModal({
                    title: '提示',
                    content: '感谢反馈',
                    success: function () {
                      wx.navigateBack({
                        url: "/pages/fankui/fankui"
                      })
                    }
                  })

                }
              })
            }
          }
        })
      }
    }else{
      var title = e.detail.value.title;
      var tel = e.detail.value.tel;
      var textCont = e.detail.value.textCont;
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      if (!myreg.test(tel)) {
        wx.showToast({
          title: '手机号有误！',
          icon: 'none',
          duration: 1500
        })
        return false;
      } if (textCont == "") {
        wx.showToast({
          title: '描述内容不能为空',
          icon: 'none',
          duration: 1500
        })
      } else {
        wx.request({
          url: api.yijian, // 仅为示例，并非真实的接口地址
          data: {
            token: api.token,
            yuanyin: title,
            tel: tel,
            img_url: that.data.allImg
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res.data);
            wx.showModal({
              title: '提示',
              content: '感谢反馈',
              success: function () {
                wx.navigateBack({
                  url: "/pages/fankui/fankui"
                })
              }
            })

          }
        })
      }
    }
   
     
  },


  // upload: function () {
  //   var that = this
  //   var imgfile;
  //   for (var i = 0; i < this.data.files.length; i++) {
  //     wx.uploadFile({
  //       url: api.up_file,//自己的接口地址
  //       filePath: that.data.files[i],
  //       name: 'file',
  //       formData: ({//上传图片所要携带的参数
  //         userName: "file",
  //         token: api.token,
  //       }),
  //       method:"post",
  //       success: function (res) {
  //         // var jsonObj = JSON.parse(res);
  //         console.log(res)
          
  //         that.setData({
  //           allImg: res.data
  //         })
  //       }
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.text);
    var that  = this;
    that.setData({
      textname: options.text
    })

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

  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }
})