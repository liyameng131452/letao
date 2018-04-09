$(function(){
  mui('.mui-scroll-wrapper').scroll({
    
  });
  //轮播图的自动轮播
  var gallery = mui('.mui-slider');
  gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})