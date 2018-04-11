
$(function(){
  //思路一：取本地存储中数组类型的数据
  function localData(){
    var str=localStorage.getItem( "search_list" )||'[]';
    var arr=JSON.parse(str);
    return arr;
  }
  //页面一进来进行渲染
  render();
  function render(){
    var arr=localData();
    var htmlStr=template('searchTmp',{arr});
    $('.history').html(htmlStr);
  }
//1添加功能
  $('.search button').click(function(){
    var key=$('.search input').val().trim();
    var arr=localData();
    var index=arr.indexOf(key);
    if(index!==-1){
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
    //清空文本
    $('.search input').val(''); 
    location.href="searchList.html?key="+key;
  })
  //2.删除功能
  $('.history').on('click','.btn-delete',function(){
    var index=$(this).data('index');
    var arr=localData();
    arr.splice(index,1);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
  });
  //3全部删除功能
  $('.history').on('click','.empty',function(){
    localStorage.removeItem('search_list');
    render();
  })
 
})