
$(function(){
  //获取地址栏里的数据，放入input框里面
  var key=getUrl('key');
  $('.search input').val(key);
  render()
  //渲染页面的函数
  function render(){
    $('.product ul').html('<div class=loading></div>')
    var param={
      proName:$('.search input').val(),
      page:1,
      pageSize:100,
    }
    //进行排序功能的添加,是先高亮在进行排序，所以先进性判断是否有current类
    var $current=$('.lt_sort .current');
    if($current.length>0){
      var sortName=$current.data('type');
      var sortValue=$current.find('i').hasClass('fa-angle-down')?2:1;
      param[sortName]=sortValue;
    }
    setTimeout(function(){
      $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:param,
        success:function(info){
          var htmlStr=template('listTmp',info);
          $('.product ul').html(htmlStr);
        }
      })
    },500)
    
  }
  //点击搜索的时候，进行页面渲染
  $('.search button').click(function(){
    render();
    var str=localStorage.getItem('search_list')||'[]';
    var arr=JSON.parse(str);
    var key=$('.search input').val();
    var index=arr.indexOf(key);
    if(index!==-1){
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
  })
  //排序功能
  $('.lt_sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else{
      $(this).addClass('current').siblings().removeClass('current');
      $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    };
    render();
  })
})