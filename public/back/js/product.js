
$(function(){
  var currenPage=1;
  var pageSize=5;
  var picArr=[];
  //进行页面渲染的函数
  render();
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currenPage,
        pageSize:pageSize
      },
      success:function(info){
        var htmlStr=template('productTmp',info);
        $('.lt_content tbody').html(htmlStr);
        //设置分页功能
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currenPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currenPage=page;
            render();
          },
          itemTexts:function(type, page, current){
            switch (type) {
              case 'next':
                return "下一页";
              case 'prev':
                return "上一页";
              case 'last':
                return "尾页";
              case 'first':
                return "首页";
              case 'page':
                return page;
            }
          },
          tooltipTitles:function(type, page, current){
            switch (type) {
              case 'next':
                return "下一页";
              case 'prev':
                return "上一页";
              case 'last':
                return "尾页";
              case 'first':
                return "首页";
              case 'page':
                return "前往" +page+"页";
            }
          },
          useBootstrapTooltip:true
        })
      }
    })
  };
  //点击添加分类按钮，显示模态框
  $('#addBtn').click(function(){
    $('#productModal').modal('show');
    //进行ajax请求渲染二级分类
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        var htmlStr=template('dropdownMenu',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });
  //点击二级分类下面的列表，获取品牌的id
  $('.dropdown-menu').on('click','a',function(){
    var id=$(this).data('id');
    $('[name="brandId"]').val(id);
    $('#droptext').text($(this).text());
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  });
  //点击上传图片按钮进行图片上传，并且显示在页面上
  $('#fileUpload').fileupload({
    dataType:'json',
    done:function(e,data){
      var picObj=data.result;
      picArr.unshift(picObj);
      console.log(picArr);
      var picAddr=data.result.picAddr;
      $('#imgBox').prepend("<img src="+picAddr+" height=100>");
      if(picArr.length>3){
        picArr.pop();
        $('#imgBox img:last').remove();
      };
      if(picArr.length===3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }
  })
  //进行表单验证
  $('#form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请输入二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'库存格式必须是非零开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'尺码格式必须是32-40'
          }

        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品价格'
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:'请上传三张图片'
          }
        }
      }
    }
  });
  //注册校验成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var data=$('#form').serialize();
    //brandId=18&statu=1&proName=%E5%95%8A%E5%95%8A&
    //proDesc=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A&num=10
    //&size=32-40&oldPrice+=4888&price=5&picStatus=
    //picName1 picAddr1  picAddr3 picName3  picName2 picAddr2
    data+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    data+="&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    data+="&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:data,
      success:function(info){
        if(info.success){
          $('#productModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
          currenPage=1;
          render();
          $('#droptext').text('请输入二级分类');
          $('#imgBox img').remove();
          //重置picArr；
          picArr=[];
        }
      }
    })
  })
});