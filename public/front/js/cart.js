$(function(){
  //进行页面的渲染
  function render(){
    setTimeout(function(){
      $.ajax({
        url:'/cart/queryCart',
        type:'get',
        success:function(info){
          console.log(info);
          var htmlStr=template('cartTmp',{info});
          $('.mui-table-view').html(htmlStr);
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    },500)
  };
  //进行下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback :function(){
          render();
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  //删除功能的实现
  $('#productList').on('tap','.btn_delete',function(){
    var id=$(this).data('id');
    console.log(id);
    mui.confirm('确认要删除此商品么','温习提示',['确认','取消'],function(e){
      if(e.index===0){
        $.ajax({
          url:'/cart/deleteCart',
          type:'get',
          data:{
            id:[id]
          },
          success:function(info){
            if(info.success){
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  });
  //修改功能
  $('#productList').on('tap','.btn_edit',function(){
    var id=this.dataset.id;
    //使用mui的确认框，因为确认框里有结构，mui可以解析html字符串，可以使用模板生成html字符串结构
    var htmlStr=template('editTmp',this.dataset);
    htmlStr=htmlStr.replace(/\n/g,'');
    mui.confirm(htmlStr,'编辑商品',['确认','取消'],function(e){
      if(e.index==0){
        var size=$('.size span.current').text();
        var num=$('.num input').val();
        $.ajax({
          url:'/cart/updateCart',
          type:'post',
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function(info){
            console.log(info);
            if(info.success){
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
    mui('.mui-numbox').numbox();
  });
 //给span注册点击事件加current的类
  $('body').on('click','.size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })






})