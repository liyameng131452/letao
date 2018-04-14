
$(function(){
  var id=getSearch('productId');
  console.log(id);
  $.ajax({
    url:'/product/queryProductDetail',
    type:'get',
    data:{
      id:id
    },
    success:function(info){
      console.log(info);
      var htmlStr=template('productTmp',info);
      $('.mui-scroll').html(htmlStr);
      var gallery = mui('.mui-slider');
      gallery.slider({
      interval:1000
      });
      mui('.mui-numbox').numbox()
    }
  });
  //给尺码添加点击事件
  $('.lt_main').on('click','.size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })
  //加入购物陈功能
  $('.add-cart').click(function(){
    var size=$('.size span.current').text();
    var num=$('.mui-numbox input').val();
    if(!size){
      mui.toast('请选择尺码');
      return;
    };
    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:{
        productId:id,
        num:num,
        size:size
      },
      success:function(info){
        console.log(info);
        if(info.success){
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if(e.index==0){
              location.href="cart.html";
            }
          })
        };
        if(info.error===400){
          //说明没登录，跳转到登录页
          location.href="login.html?reUrl="+location.href;

        }
      }
    })
  })






})