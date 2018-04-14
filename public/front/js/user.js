$(function(){
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(info){
      console.log(info);
      if(info.error){
        location.href="login.html";
        return;
      }
      var htmlStr=template('userTmp',info);
      $('.mui-media').html(htmlStr);
    }
  });
  $('.btn-logout').click(function(){
    $.ajax({
      url:'/user/logout',
      type:'get',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html"
        }
      }
    })
  })


})