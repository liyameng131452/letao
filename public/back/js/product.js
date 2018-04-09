
$(function(){
  var currenPage=1;
  var pageSize=5;
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
  })









})