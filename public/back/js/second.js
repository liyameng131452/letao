$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        var htmlStr=template('secondTmp',info);
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
  //点击分类按钮，使模态框显示，并渲染一级分类下拉列表
  $('#addBtn').click(function(){
    $('#secondModal').modal('show');
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100,
      },
      success:function(info){
        // console.log(info);
        var htmlStr=template('dropdownMenu',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });
  //点击一级分类下的分类名称，渲染到分类框内
  $('.dropdown-menu').on('click','a',function(){
    var id=$(this).data('id');
    var txt=$(this).text();
    $('#droptext').text(txt);
    $('[name="categoryId"]').val(id);
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    
  })
  //获取图片上传的地址
  $('#fileUpload').fileupload({
    dataType:'json',
    done:function(e,data){
      var picAddr=data.result.picAddr;
      // console.log(picAddr);
      $('#imgBox img').attr('src',picAddr);
      $('[name="brandLogo"]').val(picAddr);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })
  //进行表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请输入一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      }
    }
  })
  //进行验证成功后的ajax请求
  $('#form').on('success.form.bv',function(){
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function(info){
        // console.log(info);
        if(info.success){
          $('#secondModal').modal('hide');
          currentPage=1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          //因为一级下拉菜单和图片不是表单元素，所以重置不了需要手动进行设置
          $('#droptext').text('请输入一级分类');
          $('#imgBox img').attr('src','images/none.png');
        }
      }
    })
  })






})