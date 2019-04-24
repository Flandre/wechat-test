// pages/astrologyContent/astrologyContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank: 'rank-5',
    model:{},
    imagebgUrl: null,
    images: [
      './images/SP_reportC_0.png',
      './images/SP_reportC_1.png',
      './images/SP_reportC_2.png',
      './images/SP_reportC_3.png',
      './images/SP_reportC_4.png',
      './images/SP_reportC_5.png'
    ],
    items: [{
      'title': '你的月亮 拱 TA的水星',
      'content': '你们之间理性和感性是平衡的，所以你们交流起来不费劲，你很钦佩TA遇事的冷静和理性，你在情感方面回应TA，TA也乐于表达自己的看法，，你们之间有聊不完的话题，TA很理解你的情感需求，也能理性帮你分析。'
    }, {
      'title': '你的月亮 拱 TA的水星',
      'content': '你们之间理性和感性是平衡的，所以你们交流起来不费劲，你很钦佩TA遇事的冷静和理性，你在情感方面回应TA，TA也乐于表达自己的看法，，你们之间有聊不完的话题，TA很理解你的情感需求，也能理性帮你分析。'
    }, {
      'title': '你的月亮 拱 TA的水星',
      'content': '你们之间理性和感性是平衡的，所以你们交流起来不费劲，你很钦佩TA遇事的冷静和理性，你在情感方面回应TA，TA也乐于表达自己的看法，，你们之间有聊不完的话题，TA很理解你的情感需求，也能理性帮你分析。'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    console.log(options.index);
    let index = options.index;
    var imagebgUrl = this.data.images[index];
    console.log(imagebgUrl)
    this.setData({
      imagebgUrl
    });
    // 取缓存数据
    wx.getStorage({
      key: 'astroData',
      success(res) {
        that.setData({
          model: res.data[options.index]
        })
      }
    })
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