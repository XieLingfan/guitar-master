// pages/index/index.js
var chapterData = require('../../data/chapter-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterList: chapterData.chapterList,
    chapterStatus:[]
  },

  toChapter(event){
    // console.log(event)
    let chapterId = event.currentTarget.dataset.index
    if(this.chapterStatus[chapterId]) {
      wx.navigateTo({
        url: `../chapter/index?chapterId=${chapterId}`,
      })
    } else {
      wx.lin.showMessage({
        type:"warning",
        content:'该章节未解锁，请先学习之前的章节'
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var chapterStatus = wx.getStorageSync('chapterStatus')
      this.chapterStatus = chapterStatus
    } catch (e) {
      console.log(e);
    }

    
    try {
      var value = wx.getStorageSync('isFirst')
      console.log(value);
      if (!value) {
        wx.redirectTo({
          url: '/pages/welcome/index',
        })
        wx.setStorage({
          key:"isFirst",
          data:true,
        })
      }
    } catch (e) {
      console.log(e);
    }
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

  }
})