// pages/shopping/index.js
Page({
  data: {
    codeData: ''
  },
  onLoad: function (opts) {

  },
  tapScan: function(e) {
    var self = this
    wx.scanCode({
      success: function(res){
        console.log(res)
        var resArr = []
        Object.keys(res).forEach(val => {
          resArr.push({
            key: val,
            val: res[val]
          })
        })

        self.setData({codeData: resArr})
      }
    })
  }
})