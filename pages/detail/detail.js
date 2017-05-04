//logs.js
Page({
  data: {
    google_lat:'',
    google_lon:''
  },
  onLoad: function (options) {
    console.log('123213213/detail/detail123213?google_lat='+options.google_lat+'&google_lon='+options.google_lon);
    this.setData({
      google_lat:options.google_lat,
      google_lon:options.google_lon
    })

    /*
    wx.request({
    url: 'https://mini.eastday.com/mobile/170413153537969.html',
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
      if (res.data.error_code == 0) {
        that.setData({
        url:res.data.result.data
        })
      } else {
        console.log('获取失败');
      }
    }
  })
  */
  wx.openLocation({
      longitude: Number(this.data.google_lon),
      latitude: Number(this.data.google_lat),
      name: "asdasxasd",
      address: "xasdasdasdasd"
    })
  }
})
