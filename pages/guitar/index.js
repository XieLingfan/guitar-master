// pages/guitar/index.js

const { recognize } = require("../../utils/util");

var app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    fengmian:"",
    videoSrc:"",
    who:"",
    windowWidth: 0,
    trackshow: "进行手势识别",
    access_token:'',
    hand_parts: [],
    hand_img:"",
    res_img:"",
    result:"准备好后，请点击“进行手势识别”",
    recognizeId:0,
    interval:null,
    isPass:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.recognizeId = options.recognizeId
    var that = this
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    //屏幕宽度
    var sysInfo = wx.getSystemInfoSync()
    that.setData({
      windowWidth: sysInfo.windowWidth,
    })
    that.ctx = wx.createCameraContext()
    
    // 每次更新access_token
    wx.request({
      url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + app.globalData.baiduapikey + "&client_secret=" + app.globalData.baidusecretkey,
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.access_token);
        // app.globalData.access_token = res.data.access_token;
        that.setData({
          access_token: res.data.access_token
        });
      }
    })
    wx.hideLoading()
  },

  track (e){
    var that =this
    if (e.target.dataset.trackshow =="进行手势识别"){
      that.setData({
        trackshow: "停止手势识别",
      })
      that.takePhoto()
      that.interval = setInterval(this.takePhoto, 3000)
    }else{
      clearInterval(that.interval)
      that.setData({
        trackshow: "进行手势识别",
      })
    }
  },

  takePhoto() {
    console.log("takePhoto")
    var that = this
    var takephonewidth
    var takephoneheight
    that.ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        console.log(res),
        // 获取图片真实宽高
        wx.getImageInfo({
          src: res.tempImagePath,
          success: function (res) {
            takephonewidth= res.width,
            takephoneheight = res.height
          }
        })

        var img_tmp = res.tempImagePath
        wx.getFileSystemManager().readFile({
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log('data:image/png;base64,' + res.data),
            wx.request({
              url: "https://aip.baidubce.com/rest/2.0/image-classify/v1/hand_analysis?access_token=" + that.data.access_token,
              data: {
                image:res.data,
                image_type:"BASE64",
                max_face_num:10
              },
              method: 'POST',
              dataType: "json",
              header: {
                'content-type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                if(res.data.hand_num > 0) {
                  // console.log(res.data);
                  // console.log(img_tmp);
                  var tmp = recognize(res.data.hand_info[0].hand_parts,that.data.recognizeId)
                  console.log(tmp)
                  if(tmp.is_ok) {
                    clearInterval(that.interval)
                    that.setData({
                      trackshow: "进行手势识别",
                      result: tmp.info,
                    })
                  } else {
                    // clearInterval(that.interval)
                    that.setData({
                      // hand_parts : res.data.hand_info[0].hand_parts,
                      res_img : tmp.img,
                      result: tmp.info,
                    })
                  }

                  
                  
                }
              
              }
            })

          }
        })
      }
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
    var that=this
    clearInterval(that.interval)
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

  }
})