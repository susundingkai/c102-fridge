
App({

  onLaunch: function () {

    var logs = wx.getStorageSync('logs') || []

    logs.unshift(Date.now())

    wx.setStorageSync('logs', logs)
  },

  globalData: {

    userInfo: null

  },

  onShow: function () {

    console.log('App Show')

  },

  onHide: function () {

    console.log('App Hide')

  }

})