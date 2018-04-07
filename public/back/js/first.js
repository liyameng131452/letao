$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template('firstTmp',info);
        $('.lt_content tbody').html(htmlStr);
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  };
  //点击添加分类使模态框出现
  $('#addBtn').click(function(){
    $('#firstModal').modal('show');
  });
  //进行表单验证
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类名称'
          }
        }
      }
    }
  });
  //表单验证成功后，进行ajax请求
  $('#form').on('success.form.bv',function(){
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          $('#firstModal').modal('hide');
          currentPage=1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})