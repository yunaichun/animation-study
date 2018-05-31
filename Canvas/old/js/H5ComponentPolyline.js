/* 柱图组件对象 */

var H5ComponentPolyline =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  //  绘制网格线 - 背景层
  var w = cfg.width;/*整个组件宽度*/
  var h = cfg.height;/*整个组件高度*/
  //  加入一个画布（网格线背景）
  var cns = document.createElement('canvas');/*画布*/
  /*getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。*/
  var ctx = cns.getContext('2d');
  /*画布宽度*/
  cns.width = ctx.width = w;
  /*画布高度*/
  cns.height = ctx.height =h
  /*将画布放在组件中去*/
  component.append(cns);



  //  水平网格线  100 份 -> 10份
  var step = 10;/*10份*/
  ctx.beginPath();/*开始画线。beginPath()方法：起始一条路径，或重置当前路径*/
  ctx.lineWidth = 1;/*设置或返回当前的线条宽度*/
  ctx.strokeStyle = "#AAAAAA";/*设置或返回用于笔触的颜色、渐变或模式*/
  window.ctx = ctx;
  for( var i=0;i<step+1;i++){
    var y = (h/step) * i;/* (h/step)是将高度平分成10份*/
    ctx.moveTo(0,y);/*把路径移动到画布中的指定点，不创建线条*/
    ctx.lineTo(w,y);/*添加一个新点，然后在画布中创建从该点到最后指定点的线条*/
  }
  //  垂直网格线（根据项目的个数去分）
  step  = cfg.data.length+1;/*项目个数加1，在for循环中再加1，所以垂直线条比项目个数多2条*/
  /*文本宽度*/
  var text_w = w/step >> 0;
  for(var i=0;i<step+1;i++){
      var x = (w/step)*i;/* (h/step)是将高度平分成项目个数份数*/
      ctx.moveTo(x,0);/*把路径移动到画布中的指定点，不创建线条*/
      ctx.lineTo(x,h);/*添加一个新点，然后在画布中创建从该点到最后指定点的线条*/
      
      /*添加文本*/
      if( cfg.data[i]){/*多出一个*/
        /*文本用css来写，不用canvas*/
        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );/*文本信息*/
        text.css('width',text_w/2)/*宽度，在此除以2是因为父容器定义宽度为传入参数的一半*/
        .css('left',(x/2 - text_w/4) + text_w/2 );/*x/2 是定格每个部分，不加文本宽度*/
        /*添加到component之后*/
        component.append(text);
      }
  }
  ctx.stroke();/*收笔：绘制已定义的路径*/







  //  加入画布 - 数据层(两层)
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;
  component.append(cns);
  /**
   * 绘制折现以及对应的数据和阴影
   * @param  {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
   * @return {DOM}     Component元素
   */
  var draw = function( per ){
    //  清空画布
    ctx.clearRect(0,0,w,h);
    //  绘制折线数据
    ctx.beginPath();/*开始*/
    ctx.lineWidth = 3;/*画笔宽度*/
    ctx.strokeStyle = "#ff8878";/*画笔颜色*/
   


    //  画点
    var x = 0;
    var y = 0;
    var row_w = ( w / (cfg.data.length+1) );/*平分x*/
    for( i in cfg.data){
        var item = cfg.data[i];/*获取每一列数据*/
        x = row_w * i +row_w;/*每一项x坐标，最后加row_w是均分问题*/
        y = h-(item[1]*h*per);/*每一项y坐标，canvas绘图是倒着的，向下的*/
        ctx.moveTo(x,y);/*把路径移动到画布中的指定点，不创建线条*/
        ctx.arc(x,y,5,0,2*Math.PI);/*绘制圆：起始角，以弧度计*/
    }



    //  连线
    //  移动画笔到第一个数据的点位置
    ctx.moveTo( row_w ,h-(cfg.data[0][1]*h*per) );
    for( i in cfg.data){
      var item = cfg.data[i];/*拿到第i个数据*/
      x = row_w * i +row_w;/*横坐标等分在增加*/
      y = h-(item[1]*h*per);/*y坐标随传入配置数值*/
      ctx.lineTo(x,y);/*连线*/
    }
    ctx.stroke();/*收笔：绘制已定义的路径*/



    //  绘制阴影
    ctx.lineWidth = 1;/*画笔宽度*/
    ctx.strokeStyle = "rgba(255, 255, 255, 0)";/*设置或返回用于笔触的颜色、渐变或模式*/
    ctx.lineTo(x,h);/*画完线之后的最后一个位置的x，y是高h即横坐标上*/
    ctx.lineTo(row_w,h);/*画完线之后的第一个位置的x，y是高h即横坐标上*/
    ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';/*设置或返回用于填充绘画的颜色、渐变或模式*/
    /*填充当前绘图（路径）*/
    ctx.fill();



    //  写数据
    for( i in cfg.data){
          var item = cfg.data[i];/*拿到第i个数据*/
          x = row_w * i +row_w;/*横坐标等分在增加*/
          y = h-(item[1]*h*per);/*y坐标随传入配置数值*/
          /*fillStyle设置或返回用于填充绘画的颜色、渐变或模式*/
          ctx.fillStyle = item[2] ? item[2] : '#595959';/*数据颜色*/
          /*第一个参数是文本，第二个参数是横坐标，第三个坐标是纵坐标*/
          /*>>0 是去掉小数的意思*/
          ctx.fillText( ( (item[1]*100)>>0 )+'%' , x-10 , y-10  );
    }
    ctx.stroke();/*收笔：绘制已定义的路径*/
  }




  component.on('onLoad',function(){
    //  折现图生长动画
      var s = 0;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s+=.01;/* s从0到1，每个间隔是0.01*/
            draw(s);
        },i*10+500);/*递增i*10+500*/
      }
  });
  component.on('onLeave',function(){
    //  折现图退场动画
      var s = 1;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s-=.01;
            draw(s);
        },i*10);
      }
  });
  
  return component;
}