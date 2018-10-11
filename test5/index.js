// pages/shopping/index.js
Page({
  data: {
    tabTitle: ['标题1', '标题2', '标题3'],
    listDetail: [
      '标题1的内容',
      '标题2的内容',
      '标题3的内容'
    ],
    showIndex: 0
  },
  onLoad: function (opts) {

  },
  tapTitle: function(e) {
    this.setData({showIndex: e.currentTarget.dataset.index})
  }
})