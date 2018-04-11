$(function(){
  //请求ajax渲染左边区域
  $.ajax({
      url:'/category/queryTopCategory',
      type:'get',
      success:function(info){
        console.log(info);
        var htmlStr=template('leftTmp',info);
        $('.category_left').html(htmlStr);
        //页面一进来就渲染第一个，因为不知道第一个id是什么，所以要在分类一请求回来的数据里面写
        render(info.rows[0].id);
      }
  })
//点击左侧一级分类渲染右边数据
$('.category_left').on('click','a',function(){
  var id =$(this).data('id');
  render(id);
  $(this).addClass('current').parent().siblings().find('a').removeClass('current');

})

//右边渲染页面的函数
  function render(id){
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      data:{id:id},
      success:function(info){
        console.log(info);
        var htmlStr=template('rightTmp',info);
        $('.category_right ul').html(htmlStr);
      }
    })
  }
})