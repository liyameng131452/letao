$(function(){
  mui('.mui-scroll-wrapper').scroll({
  });
  //轮播图的自动轮播
  var gallery = mui('.mui-slider');
  gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
  //封装获取地址栏参数的函数 
 
  
})
//为什么不能写在里面？
function getSearch(key){
  var urlStr=location.search;
  urlStr=decodeURI(urlStr);
  urlStr=urlStr.slice(1);
  var arr=urlStr.split('&');
  var obj={};
  arr.forEach(function(v,i){
    var key=v.split('=')[0];
    var value=v.split('=')[1];
    obj[key]=value;
  })
  return obj[key];
}