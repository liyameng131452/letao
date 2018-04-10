
$(function(){
  //1从本地存储中获取数据,封装起来
  render();
  function history(){
    var historyStr=localStorage.getItem('search_list');
    var arr=JSON.parse(historyStr||'[]');
    return arr;
  }
  //2进行渲染页面,封装起来
  function render(){
    var arr=history();
    $('.history').html(template('searchTmp',{arr}));
  }
  //3进行删除操作
  $('.history').on('click','.btn-delete',function(){
    var $that=$(this)
   mui.confirm('你是要清空所有的历史记录','温馨提示',['取消','确定'],function(e){
    if(e.index===1){
      var index=$that.data('index');
      //删除数组里的index的项
      var arr=history();
      arr.splice(index,1);
      console.log(arr);
      localStorage.setItem('search_list',JSON.stringify(arr));
      render();
    }
   })
  });
  //4进行清空操作
  $('.history').on('click','.empty',function(){
    mui.confirm('你是要清空所有的历史记录','温馨提示',['取消','确定'],function(e){
      if(e.index===1){
        localStorage.removeItem('search_list');
        render();
      }
    })
  });
  //进行添加功能
  $('.search button').click(function(){
    var arr=history();
    var key=$('.search input').val().trim();
    if(key===""){
      mui.toast("请输入搜索关键字");
      return ;
    }
    if(arr.indexOf(key)!==-1){
        var index=arr.indexOf(key);
        arr.splice(index,1);
    }
    if(arr.length>=10){
        arr.pop();
      }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    $('.search input').val('');
    location.href="searchList.html?key="+key;

  })
  

})