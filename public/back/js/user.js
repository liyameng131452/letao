$(function(){
  var currentPage=1;
  var pageSize=5;
  //页面渲染函数的封装
  render();
  function render(){
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template('userTmp',info);
        $('.lt_content tbody').html(htmlStr);
        //分页功能的实现
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil((info.total/info.size)),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();
          }
        });
      }
    });
  };
  //点击禁用.启用按钮式模态框显现
  $('.lt_content tbody').on('click','.btn',function(){
    var id=$(this).parent().data('id');
    console.log(id);
    var isDelete=$(this).hasClass('btn-danger')?0:1;
    $('#userModal').modal('show');
    $('#confirmBtn').off('click').on('click',function(){
      $.ajax({
        url:'/user/updateUser',
        type:'post',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          if(info.success){
            $('#userModal').modal('hide');
            render();
          }
        }
      })
    })
  })
})