/* 柱图组件对象 */

var H5ComponentBar =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );

  $.each(cfg.data,function(idx,item){
    /*最外层包裹项目*/
    var line = $('<div class="line">');
    /*第一项：名称*/
    var name = $('<div class="name">');
    /*第二项：百分比样式*/
    var rate = $('<div class="rate">');
    /*第二项：百分比*/
    var per = $('<div class="per">');


    /*第一项：名称添加值*/
    name.text( item[0]);
    /*第二项：百分比样式宽度值*/
    var width = item[1]*100 + '%';
    var  bgStyle = '';
    /*css中有默认样式颜色 background-color: #99c0ff*/
    if( item[2] ){
      bgStyle = 'style="background-color:'+item[2]+'"';
    }
    /*不单独在rate上设置背景颜色，是因为颜色动画增长处有用*/
    rate.html( '<div class="bg" '+bgStyle+'></div>' );
    rate.css('width',width);


    /*第二项：百分比值*/
    per.text(width);


    /*添加在line最外层上*/
    line.append( name ).append( rate ).append( per );
    /*添加在组件上*/
    component.append(line);
  });

  /*最后重新返回一个更丰满的组件*/
  return component;
}