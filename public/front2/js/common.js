$(function(){
  //区域滚动部分
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
  });
  //首页轮播图部分
  mui('.mui-slider').slider({
    interval:1000
  });
})
//解析地址栏里的数据
function getUrl(key){
  var obj={};
  var arr=decodeURI(location.search).slice(1).split('&');
  arr.forEach(function(v,i){
    var key=v.split('=')[0];
    var value=v.split('=')[1];
    obj[key]=value;
  })
  return obj[key];
}
