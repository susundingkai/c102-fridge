var app = getApp()

Page({



  //页面的初始数据

  data: {
    imglist: ['https://s1.ax1x.com/2018/12/02/FKm5WD.jpg']

    //用户个人信息


  },

  //点击添加地址事件

  add_address_fun: function() {

    wx.navigateTo({

      url: 'add_address/add_address',

    })

  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imglist // 需要预览的图片http链接列表  
    })
  },



  //生命周期函数--监听页面加载 

  onLoad: function(options) {






  },



  onReady: function() {



  },





  onShow: function() {



  },



  onHide: function() {



  },



  onUnload: function() {



  },



  onPullDownRefresh: function() {



  },



  onReachBottom: function() {

  },

  onShareAppMessage: function() {



  }

})