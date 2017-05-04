//index.js
//获取应用实例
Page({
  data: {
    hasLocation: false,
    long_str:"",
    lat_str:"",
    topNews:[],
    wifiInfos:[],
    no_wifi:""
  },
  onLoad: function () {
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          longstr:res.longitude,
          latstr:res.latitude,
          long_str:res.longitude,
          lat_str:res.latitude
        })
      }
    })

  },
    //事件处理函数
  
  btnUpdateLocation: function() {
    var that = this
    wx.getLocation({
      success: function (res) {
        
        console.log(res)
        that.setData({
          hasLocation: true,
          longstr:res.longitude,
          latstr:res.latitude,
          long_str:res.longitude,
          lat_str:res.latitude
        })
      }
    })
  },

  querywifi: function(){
    var page = this
// 访问聚合数据的网络接口-科技新闻
  wx.request({
    url: 'https://apis.juhe.cn/wifi/local',
    data: {
     lon: page.data.long_str,
     lat:page.data.lat_str,
    gtype:3,
    r:700,
     key: "eeaee1ed22636046282f8524fd64eaba"
    },
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
      console.log(res);
      if (res.data.error_code == 0) {
        if(res.data.result == null){
          page.setData({
            no_wifi:"该区域附近没有查询到免费WIFI"
        })
        }else{
          /*
          for(var i = 0;i < res.data.result.data.length;i++){
            console.log(res.data.result.data[i].intro);
            res.data.result.data[i].intro = res.data.result.data[i].intro.replace("↵","");
            res.data.result.data[i].intro = res.data.result.data[i].intro.replace("\n","");
            console.log(res.data.result.data[i].intro);
          }
          */     
          page.setData({
            wifiInfos:res.data.result.data,
            no_wifi:""
        })
        console.log(page.data.wifiInfos);
        }
        
      } else {
        page.setData({
            no_wifi:"该区域附近没有查询到免费WIFI"
        })
        console.log('获取失败');
      }
    }
  })
  },
  bindViewTap:function(event){
    var that = this
    console.log(event);
    console.log('../detail/detail?google_lat='+event.currentTarget.dataset.baidu_lat+'&google_lon='+event.currentTarget.dataset.baidu_lon);

var x = parseFloat(event.currentTarget.dataset.baidu_lon) - 0.0065;
var y = parseFloat(event.currentTarget.dataset.baidu_lat) - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * 3.1415926);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * 3.1415926);
    var gg_lon = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    console.log('../detail/detail?gooe_lat='+gg_lat+'&goe_lon='+gg_lon);
    wx.openLocation({
      longitude: Number(gg_lon),
      latitude: Number(gg_lat),
      name: event.currentTarget.dataset.intro,
      address: event.currentTarget.dataset.address
    })
    /*
    wx.navigateTo({

      url: "../detail/detail?google_lat="+event.currentTarget.dataset.google_lat+"&google_lon="+event.currentTarget.dataset.google_lon,
      
      complete:function(res){
        console.log(res)
    }
    })
    */
  }
  
})
