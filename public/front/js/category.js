$(function(){
  //请求左侧的数据
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    success:function(info){
      var htmlStr=template('leftTmp',info);
      $('.category_left ul').html(htmlStr);
      render(info.rows[0].id)
    }
  })
  //请求右侧数据,点击左侧a渲染右面数据
  $('.category_left ul').on('click','a',function(){
    var id=$(this).data('id');
    render(id);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  });
  //渲染右侧函数
  function render(id){
    $.ajax({
      url:'/category/querySecondCategory',
     data:{
       id:id
     },
      type:'get',
      success:function(info){
        var htmlStr=template('rightTmp',info);
        $('.category_right ul').html(htmlStr);
      }
    })
  }
  
})