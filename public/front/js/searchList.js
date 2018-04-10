$(function(){
  var key=getSearch('key');
  $('.search input').val(key);
  //页面渲染的函数
  render();
  function render(){
    $('.product ul').html('<div class="loading"></div>');
    var params={
      proName: $('.search input').val(),
      page:1,
      pageSize:100,
    }
    var $current=$('.lt_sort .current');
    if($current.length>0){
      var sortName=$current.data('type');
      var value=$current.find('i').hasClass('fa-angle-up')?1:2;
      params[sortName]=value;       
    }
    setTimeout(function(){
      $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:params,
        success:function(info){
          $('.product ul').html(template('listTmp',info));
        }
      })
    },500)
  };
  //点击搜索按钮进行渲染
  $('.search button').click(function(){
    render();
    var key= $('.search input').val();
    var history=localStorage.getItem('search_list'||'[]');
    var arr=JSON.parse(history);
    console.log(arr);
    var index=arr.indexOf(key);
    console.log(index);
    if(index!==-1){
      arr.splice(index,1)
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
  });
  //点击排序按钮进行排序
  $('a[data-type]').click(function(){
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }else{
      $(this).addClass('current').siblings().removeClass('current');
      $('lt_sort i').removeClass('fa-angle-up').addClass('fa-angle-down');
    };
    render();
    
  })
})