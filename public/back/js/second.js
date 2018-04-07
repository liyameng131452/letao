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
        console.log(info);
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
  })







})