$(function(){
  //根据准备好的dom对象初始化echarts实例
  var echarts1 = echarts.init(document.querySelector('.echarts_1'));
  var option1 = {
      title: {
          text: '2017年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [1000, 1500, 2000, 1800, 500, 700]
      }]
  };
  echarts1.setOption(option1);
  var echarts2 = echarts.init(document.querySelector('.echarts_2'));
  var option2 = {
    title : {
        text: '热门销售品牌',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
        {
            name: '品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
  echarts2.setOption(option2);
})