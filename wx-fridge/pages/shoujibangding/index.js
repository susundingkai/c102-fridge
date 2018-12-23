// pages/shoujibangding/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    phone: "",
    user: ""
  },
  confirms:function(c){
    console.log(c)
    wx.request({
      url: 'https://cxz.fightfor0427.cn/user',
      method: "POST",
      data: {
        Phone:c.detail.value.phone,
        Name: c.detail.value.name,
        Id:1
      }
    })
    wx.switchTab({
      url: '../geren/message',
    })
    wx.showToast({
      title: '绑定成功！',
      icon: 'success',
      duration: 1500
    })
   
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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