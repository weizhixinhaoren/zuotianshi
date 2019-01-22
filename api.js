var apiUrl = "http://0160.jnjy8.com/Admin/api/";
var videourl = 'http://0160.jnjy8.com/';
var api = {
  token:"RBsa16dwA5eKU1q6s1d6sa",
  index: {
    banner: apiUrl + 'banner',//banner
    index_nav: apiUrl + 'index_nav',//导航
    index_sp: apiUrl + 'index_sp',//视频
    user_info: apiUrl +"user_info",//查找用户
    index_sp_operation: apiUrl + "index_sp_operation",//首页视频操作接口
    index_sp_info: apiUrl + 'index_sp_info', //视频的详细信息
    index_tj: apiUrl + "index_tj "//首页推荐
  },
  up_file: apiUrl + "up_file",//上传视频的接口
  fl_hd: apiUrl + "fl_hd",//福利
  fl_hd_info: apiUrl +"fl_hd_info",//福利详情
  hezuo: apiUrl + "hezuo",//商务合作
  user: apiUrl + "user",//用户
  user_info: apiUrl +"user_info",//获取用户信息
  yijian: apiUrl + "yijian",//意见反馈
  user_sq: apiUrl+"user_sq",//申请用户
  shequ_sp_info: apiUrl + "shequ_sp_info",//社区视频详细信息
  shequ_fb: apiUrl + "shequ_fb",//社区内容发布
  shequ_sp: apiUrl +"shequ_sp",//社区list
  fx_ewm: apiUrl +"fx_ewm",//分享二维码
  index_sp_operation: apiUrl +'index_sp_operation',//点赞 收藏 转发
  sc_sp: apiUrl +"sc_sp",//收藏的视频
  qx_sc: apiUrl +"qx_sc",//删除收藏视频
  index_sp_ss: apiUrl +"index_sp_ss",//搜索
  user_ss: apiUrl +"user_ss",//高级用户搜索
  user_list: apiUrl + "user_list",//用户搜索
  shequ_sp_operation: apiUrl+"shequ_sp_operation",//社区动态操作
  gz: apiUrl +"gz",//关注用户
  gz_list: apiUrl + "gz_list",
  qx_gz: apiUrl +'qx_gz',//取消关注
  fl_hd_tp: apiUrl +"fl_hd_tp",//福利投票
}


module.exports = api;