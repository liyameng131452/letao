$(function(){
  //页面一进来就进行渲染 
  var key=getSearch('key');
  $('.search input').val(key);
  //页面渲染的函数
  var currentPage=1;
  var pageSize=4;
  function render(callback){
    var params={
      proName: $('.search input').val(),
      page:currentPage,
      pageSize: pageSize,
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
          console.log(info);
          // $('.product ul').html(template('listTmp',info));
          callback(info);
        }
      })
    },500)
  };
  
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback:function(){
          currentPage=1;
          render(function(info){
            $('.product ul').html(template('listTmp',info));
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
          })
        }

      },
      up : {
        callback:function(){
          currentPage++;
          render(function(info){
            if(info.data.length>0){
              $('.product ul').append(template('listTmp',info));
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            }else{
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }
          })
        }
      }
    }
  });
  //点击搜索按钮进行渲染
  $('.search button').click(function(){
    //重新触发下刷新
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
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
  $('a[data-type]').on('tap',function(){
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }else{
      $(this).addClass('current').siblings().removeClass('current');
      $('lt_sort i').removeClass('fa-angle-up').addClass('fa-angle-down');
    };
    //重新执行刷新功能
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  });
})