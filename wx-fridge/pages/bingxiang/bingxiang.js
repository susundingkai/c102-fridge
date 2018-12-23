var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    second: 4,
    list:[],
    time: [],
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2030, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    activeName: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    // 展开折叠
    selectedFlag: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    settingFlag: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

  },
  
  col(event){
   // console.log(event.currentTarget.id)
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },
  onChange(event) {
    console.log(event.detail)
    this.setData({
      currentDate: event.detail
    })
  },
    onChanges(event) {
      console.log(event.detail)
      this.setData({
        currentDate: event.detail
      });
      console.log(event.currentTarget.id)
      wx.request({
        url: 'https://cxz.fightfor0427.cn/wx',
        method: "POST",
        data: {
          Code: [this.data.list[event.currentTarget.id][0]],
          Name: ["null"],
          Del: [0],
          Timer: [String(event.detail)]
        }
      })
      this.setData({
        activeName: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      })
 //   console.log(this.data.currentDate)
  },
  changeToggle: function (e) {
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
    } else {
      this.data.selectedFlag[index] = true;
    }

    this.setData({
      selectedFlag: this.data.selectedFlag
    })
  },
  setting: function (e) {
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    if (this.data.settingFlag[index]) {
      this.data.settingFlag[index] = false;
    } else {
      this.data.settingFlag[index] = true;
    }
    for (var i = 0; i < 50; i++) {
      if (this.data.settingFlag[index] == true &&i!=index){
        this.data.settingFlag[i] = false;
      }
    }
    this.setData({
      settingFlag: this.data.settingFlag
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    wx.request({
      url: 'https://cxz.fightfor0427.cn/wx',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data,
          //res代表success函数的事件对，data是固定的，list是数组
        })
        var str = []
        for (var i = 0; i < res.data.length; i++) {
          var start_date = new Date(res.data[i][3].replace(/-/g, "/"));
          var end_date = new Date(util.formatTime(new Date()).replace(/-/g, "/"));
          console.log(end_date)
          var days = end_date.getTime() - start_date.getTime();
          var day = parseInt(days / (1000 * 60 * 60 * 24));
          var hour = parseInt((days / (1000 * 60 * 60)) % 24);
          var min = parseInt((days / (1000 * 60)) - day * 24 * 60 - hour * 60);
          str[i] = day + "天" + hour + "小时" + min + "分钟";
          that.setData({
            time: str
          })
        }
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
    for (var i = 0; i < 50; i++) {
      this.data.settingFlag[i] = false;
    }
    this.setData({
      settingFlag: this.data.settingFlag
    })
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
  sub: function (c) {
    console.log(c)
    console.log(c.detail.value.name)
    if (!c.detail.value.name) {
      wx.showModal({
        showCancel:false,
        title: '提示',
        content: '请输入有效内容！',
        success: function (res) {
          if (res.confirm) {
          } 
        }
      })
    }else{
    var code = this.list
    wx.request({
      url: 'https://cxz.fightfor0427.cn/wx',
      method: "POST",
      data: {
        Code: [this.data.list[c.currentTarget.id][0]],
        Name: [c.detail.value.name],
        
        Del: [0]
      }
    })
      if (this.data.settingFlag[c.currentTarget.id]) {
        this.data.settingFlag[c.currentTarget.id] = false;
      } else {
        this.data.settingFlag[c.currentTarget.id] = true;
      }

      this.setData({
        settingFlag: this.data.settingFlag
      })
    this.onLoad();
    }
  },
  reset:function(c){
    if (this.data.settingFlag[c.currentTarget.id]) {
      this.data.settingFlag[c.currentTarget.id] = false;
    } else {
      this.data.settingFlag[c.currentTarget.id] = true;
    }

    this.setData({
      settingFlag: this.data.settingFlag
    })
  },
  del:function(c){
    console.log(c)
    wx.request({
      url: 'https://cxz.fightfor0427.cn/wx',
      method: "POST",
      data: {
        Code: [this.data.list[c.currentTarget.id][0]],
        Name: ["GG"],
        Del: [1],
        Timer:[0]
      }
    })
    this.onLoad();
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
        this.onLoad()
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
  },
  rese: function () {
    this.setData({
      activeName: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    })
  },
  close:function(){
    this.setData({
      activeName: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    })
  },
  close2:function(){
    this.setData({
    selectedFlag: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      settingFlag: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    })

  }
})
