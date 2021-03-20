// pages/chapter/index.js
var sectionData = require('../../data/section-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latest: false,
    first: true,
    sectionList: [],
    curSection: {},
  },


  onNext: function(event) {
    let length = this.data.sectionList.length
    let id = this.data.curSection.id
    let first = this.data.first
    let latest = this.data.latest
    if(id+1 != 0) first = false
    if(id+1 == length-1) latest = true
    this.setData({
      curSection : this.data.sectionList[id+1],
      first,
      latest
    })
  },

  onPrevious: function(event) {
    let length = this.data.sectionList.length
    let id = this.data.curSection.id
    let first = this.data.first
    let latest = this.data.latest
    if(id-1 == 0) first = true
    if(id-1 != length-1) latest = false
    this.setData({
      curSection : this.data.sectionList[id-1],
      first,
      latest
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sectionList = sectionData.sectionList[options.chapterId]
    let length = sectionList.length
    let latest = this.data.latest
    if(length == 1) latest = true

    this.setData({
      sectionList,
      curSection : sectionData.sectionList[options.chapterId][0],
      latest
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0,
    })
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
    wx.navigateTo({
      url: `../guitar/index?recognizeId=${this.data.curSection.recognizeId}`,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})