//rotate.js
Page({
  onReady:function(e){
    let self = this
    wx.getSystemInfo({
      success: function (res) {
        self.initMovieClip(750 / res.windowWidth)
      },
    })
  },
  initMovieClip: function(pr){
    let context = wx.createCanvasContext('ct'), fps = 25, interval = 1000 / fps
    this.objs = {
      car: {
        x: 594,
        y: 370,
        start: {
          x: 594,
          y: 370
        },
        end: {
          x: -210,
          y: -70
        },
        pause: {
          x: 304,
          y: 211,
        },
        deathArea: {
          x: 47,
          y: 70
        },
        crossTime: 50
      },
      human: {
        x: 0,
        y: 0,
        type: 'life',
        start: {
          x: 594,
          y: 20
        },
        pause: {
          x: 332,
          y: 150,
        },
        deathArea: {
          x: 232,
          y: 200
        },
        end: {
          x: -210,
          y: 420
        },
        crossTime: 200
      },
      trafficLight: {
        type: 'red',
        enableCarCross: false
      }
    }
    this.cfgs = {
      ctx: context,
      interval: interval,
      pr: pr,
      redTime: 250,
      greenTime: 250
    }
    this.count = 250
    this.renderMovieClip()
    this.updateMovieClip()
  },
  updateMovieClip: function(){
    let self = this
    setInterval(() => {
      if(self.objs.human.type == 'life'){
        /* 汽车运动 */
        if(self.objs.car.x > self.objs.car.end.x && self.objs.car.y > self.objs.car.end.y){
          /* 处理红灯，阻塞车辆运动 */
          if(self.objs.trafficLight.enableCarCross){
            self.objs.car.x = self.objs.car.x + (self.objs.car.end.x - self.objs.car.start.x) / self.objs.car.crossTime
            self.objs.car.y = self.objs.car.y + (self.objs.car.end.y - self.objs.car.start.y) / self.objs.car.crossTime
          } else {
            /* 车辆等红灯 */
            if(self.objs.car.x > self.objs.car.pause.x - 2 && self.objs.car.x < self.objs.car.pause.x + 2){
            } else {
              self.objs.car.x = self.objs.car.x + (self.objs.car.end.x - self.objs.car.start.x) / self.objs.car.crossTime
              self.objs.car.y = self.objs.car.y + (self.objs.car.end.y - self.objs.car.start.y) / self.objs.car.crossTime
            }
          }
        } else {
          self.objs.car.x = self.objs.car.start.x
          self.objs.car.y = self.objs.car.start.y
        }
        /*行人运动 */
        if(self.objs.human.x > self.objs.human.end.x && self.objs.human.y < self.objs.human.end.y){
          /* 处理红灯，阻塞车辆运动 */
          if(!self.objs.trafficLight.enableCarCross){
            self.objs.human.x = self.objs.human.x + (self.objs.human.end.x - self.objs.human.start.x) / self.objs.human.crossTime
            self.objs.human.y = self.objs.human.y + (self.objs.human.end.y - self.objs.human.start.y) / self.objs.human.crossTime
          } else {
            /* 行人等红灯 */
            if(self.objs.human.x > self.objs.human.pause.x - 2 && self.objs.human.x < self.objs.human.pause.x + 2){
            } else {
              self.objs.human.x = self.objs.human.x + (self.objs.human.end.x - self.objs.human.start.x) / self.objs.human.crossTime
              self.objs.human.y = self.objs.human.y + (self.objs.human.end.y - self.objs.human.start.y) / self.objs.human.crossTime
            }
          }
        } else {
          self.objs.human.x = self.objs.human.start.x
          self.objs.human.y = self.objs.human.start.y
        }
      } else {
        /*撞死人 车辆开到安全区外*/
        if(self.objs.car.x > self.objs.car.deathArea.x - 20 && self.objs.car.x < self.objs.car.deathArea.x - 10){
        } else {
          self.objs.car.x = self.objs.car.x + (self.objs.car.end.x - self.objs.car.start.x) / self.objs.car.crossTime
          self.objs.car.y = self.objs.car.y + (self.objs.car.end.y - self.objs.car.start.y) / self.objs.car.crossTime
        }
      }
      /*维护信号灯*/
      if(self.count > 0){
        self.count = self.count - 1
      } else {
        if(self.objs.trafficLight.enableCarCross){
          self.objs.trafficLight.enableCarCross = false
          self.objs.trafficLight.type = 'red'
          self.count = self.cfgs.redTime
        } else {
          self.objs.trafficLight.enableCarCross = true
          self.objs.trafficLight.type = 'green'
          self.count = self.cfgs.greenTime
        }
      }
      self.checkCollision()
      self.renderMovieClip()
    }, self.cfgs.interval)
  },
  renderMovieClip: function(){
    let _t = this, ctx = _t.cfgs.ctx, pr = _t.cfgs.pr
    ctx.drawImage('img/bg.png', 0, 0, 594/pr, 370/pr)
    ctx.drawImage('img/car.png', _t.objs.car.x/pr, _t.objs.car.y/pr, 210/pr, 147/pr)
    if(_t.objs.human.type == 'life'){
      ctx.drawImage('img/human.png', _t.objs.human.x/pr, _t.objs.human.y/pr, 36/pr, 48/pr)
    } else {
      ctx.drawImage('img/death.png', _t.objs.human.x/pr, _t.objs.human.y/pr, 50/pr, 61/pr)
    }

    /*console*/
    ctx.setFontSize(30/pr)
    ctx.fillText(`车的x轴：${~~_t.objs.car.x}`, 0/pr, 400/pr)
    ctx.fillText(`车的y轴：${~~_t.objs.car.y}`, 0/pr, 430/pr)

    ctx.fillText(`人的x轴：${~~_t.objs.human.x}`, 0/pr, 460/pr)
    ctx.fillText(`人的y轴：${~~_t.objs.human.y}`, 0/pr, 490/pr)

    ctx.fillText(`信号灯颜色：${_t.objs.trafficLight.type}`, 0/pr, 520/pr)
    ctx.fillText(`车辆是否可通过：${_t.objs.trafficLight.enableCarCross}`, 0/pr, 550/pr)

    ctx.fillText(`信号灯倒计时：${_t.count}`, 0/pr, 580/pr)

    ctx.fillText(`人的状态：${_t.objs.human.type}`, 0/pr, 610/pr)

    ctx.draw()
  },
  checkCollision: function(){
    let self = this
    if((self.objs.car.x < self.objs.car.pause.x - 2) &&
      (self.objs.car.x > self.objs.car.deathArea.x + 2) &&
      (self.objs.human.x < self.objs.human.pause.x - 2) &&
      (self.objs.human.x > self.objs.human.deathArea.x + 2)){
      self.objs.human.type = 'death'
    }
  },
  tapLight: function(){
    let self = this
    if(!self.objs.trafficLight.enableCarCross){
      self.objs.trafficLight.enableCarCross = true
      self.objs.trafficLight.type = 'green'
      self.count = self.cfgs.greenTime
    }
  },
  tapHumanLife: function(){
    this.objs.human.type = 'life'
  }
})