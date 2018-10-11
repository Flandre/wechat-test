//rotate.js
Page({
  onReady:function(e){
    let self = this
    wx.getSystemInfo({
      success: function (res) {
        self.pr = 750 / res.windowWidth
        self.initLuckdraw()
      },
    })
  },
  initLuckdraw: function(){
    let self = this
    /* 获取商品信息，此处为假数据 */
    self.setData({
      luckdrawImg: Math.random() < 0.5 ? 'img/death.png' : 'img/car.png'
    })
    self.ctx = wx.createCanvasContext('luckdraw')
    self.count = 0
    self.drawLuckCard()
  },
  drawLuckCard: function(){
    let self = this, ctx = self.ctx, pr = self.pr
    ctx.setFillStyle('#999')
    ctx.fillRect(0, 0, 450/pr, 200/pr)
    ctx.draw()
  },
  touchStart: function(e){
    let self = this, touches = e.touches[0], tx = touches.x, ty = touches.y
    self.x = tx, self.y = ty
  },
  touchMove: function(e){
    let self = this, touches = e.touches[0], tx = touches.x, ty = touches.y, ctx = self.ctx, pr = self.pr, r = 30/pr
    console.log(`x: ${tx},y: ${ty}`)
    if(self.x && self.y){
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.setLineJoin('round');
      ctx.setLineCap('round');
      ctx.setLineWidth(r * 2);
      // ctx.setStrokeStyle('red')
      ctx.moveTo(self.x, self.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.restore()
      ctx.draw(true)
      self.count = self.count + Math.sqrt((tx - self.x) * (tx - self.x) + (ty - self.y) * (ty - self.y))
    }
    self.x = tx, self.y = ty
  },
  touchEnd: function(){
    console.log(this.count)

  },
  luckdraw: function(){
    this.initLuckdraw()
  }
})