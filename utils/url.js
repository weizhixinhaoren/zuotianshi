function wxrequest(url,id, page, fn,) {
  var that = this;
  wx.request({
    url: url, // 仅为示例，并非真实的接口地址
    data: {
      page,
      token: "RBsa16dwA5eKU1q6s1d6sa",
      id:id

    },
    header: {
      // 默认值
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    success(res) {
      if (res.data.msg == 0) {
          wx.showLoading({
            title: '已经到底了',
            duration: 2000
          })
      }else{
        var data = res.data.info;
        console.log(res.data);
        that.setData({
          jingxuanvideo: that.data.jingxuanvideo.concat(data)
        })
        fn(data);
      }
    },
  })
}
//首页 banner 导航 
function request(url,fn){
  var that = this;
  wx.request({
    url: url, // 仅为示例，并非真实的接口地址
    data: {
      token: "RBsa16dwA5eKU1q6s1d6sa",
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded" // 默认值
    },
    method: "POST",
    success(res) {
      fn(res);
    }
  })
}
//首页 精选知识视频
function requestVid(url,id,page, fn) {
  var that = this;
  wx.request({
    url: url, // 仅为示例，并非真实的接口地址
    data: {
      token: "RBsa16dwA5eKU1q6s1d6sa",
      page:page,
      id:id
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded" // 默认值
    },
    method: "POST",
    success(res) {
      fn(res);
      console.log(res)
    }
  })
}

// 向外暴露接口
module.exports = {
  wxrequest: wxrequest,
  request: request,
  requestVid: requestVid
}