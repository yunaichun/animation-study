/* 散点图表组件对象 */

var H5ComponentPoint =function ( name, cfg ) {
   /*添加组件*/
   var component =  new H5ComponentBase( name ,cfg );
   
   /*基于第一个数据的比例大小定位的*/
   var base = cfg.data[0][1];   //  以第一个数据的 比例为大小的 100%

   //   输出每个 Point
   $.each( cfg.data,function( idx ,item ){
        /*输出每个点*/
        var point = $('<div class="point point_'+idx+'" >');

        /*1、项目名称*/
        var name = $('<div class="name">'+item[0]+'</div>');
        /*2、比例*/
        var rate = $('<div class="per">'+ (item[1]*100)+'%</div>');

        name.append(rate);
        point.append(name);


        /*3、百分比，第一个为100%*/
        var per =  (item[1]/base*100) + '%';
        /*宽度和高度*/
        point.width(per).height(per);


        /*4、颜色不是必须的*/
        if(item[2]){
            /*第三项*/
            point.css('background-color',item[2]);
        }
        /*5、位置*/
        if(item[3] !== undefined && item[4]!== undefined ){
            /*定位*/
            point.css('left',item[3]).css('top',item[4]);
        }

        point.css('transition','all 1s '+idx*.5+'s');
       
        /*组件添加点*/
        component.append( point );

   } );

   /*组件添加点击事件*/
   component.find('.point').on('click',function(){

        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
   }).eq(0).addClass('point_focus')

   return component;
}