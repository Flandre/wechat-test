// pages/shopping/index.js
import drawQrcode from './weapp.qrcode.esm.js'

Page({
  data: {
    codeData: ''
  },
  onLoad: function (opts) {

  },
  createQR: function(e) {
    wx.getSystemInfo({
      success: function (res) {
        let pr = 750 / res.windowWidth
        drawQrcode({
          width: 200 / pr,
          height: 200 / pr,
          canvasId: 'cvs',
          text: e.detail.value
        })
      },
    })

  },
  output: function(e){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      destWidth: 200,
      destHeight: 200,
      canvasId: 'cvs',
      success(res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(res){
            console.log(res)
          }
        })
      }
    })
  }
})