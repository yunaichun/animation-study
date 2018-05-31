/* 饼图组件对象 */

var H5ComponentPie =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  
  //  绘制网格线 - 背景层
  var w = cfg.width;
  var h = cfg.height;



  //  加入一个画布（网格线背景）
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;
  $(cns).css('zIndex',1);
  component.append(cns);/*添加到组件*/
  var r =w/2;
  //  加入一个底图层
  ctx.beginPath();
  ctx.fillStyle='#eee';
  ctx.strokeStyle='#eee';
  ctx.lineWidth = 1;
  ctx.arc(r,r,r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();/*收笔：绘制已定义的路径*/



  //  绘制一个数据层
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;
  $(cns).css('zIndex',2);
  component.append(cns);
  var colors = ['red','green','blue','#a00','orange']; //  备用颜色
  var sAngel = 1.5 * Math.PI; //  设置开始的角度在 12 点位置
  var eAngel = 0; //  结束角度
  var aAngel = Math.PI*2; //  100%的圆结束的角度 2pi = 360
  var step = cfg.data.length;/*所有配置项目数*/
  for(var i=0;i<step;i++){
    var item  = cfg.data[i];
    var color = item[2] || ( item[2] = colors.pop() );/*如果有颜色就用你的颜色，否则用备用颜色*/
    /*结束弧度*/
    eAngel = sAngel + aAngel * item[1];
    ctx.beginPath();/*开始画图*/
    ctx.fillStyle=color;/*填充颜色*/
    ctx.strokeStyle=color;/*画笔颜色*/
    ctx.lineWidth = .1;/*画笔宽度*/
    ctx.moveTo(r,r);/*移动到圆心的位置*/
    ctx.arc(r,r,r,sAngel,eAngel);/*开始画圆*/
    ctx.fill();/*填充圆的颜色*/
    ctx.stroke();/*收笔：绘制已定义的路径*/
    /*归为*/
    sAngel = eAngel;




    //  加入所有的项目文本以及百分比
    var text = $('<div class="text">');
    text.text( cfg.data[i][0] );/*文本内容*/
    var per =  $('<div class="per">');
    per.text( cfg.data[i][1]*100 +'%'  );/*百分比*/
    text.append(per);/*百分比放在文本后*/
    var x = r + Math.sin( .5 * Math.PI - sAngel ) * r;/*x坐标*/
    var y = r + Math.cos( .5 * Math.PI - sAngel ) * r;/*y坐标*/
    // text.css('left',x/2);
    // text.css('top',y/2);
    if(x > w/2){/*右边元素*/
      text.css('left',x/2);
    }else{/*左边元素*/
      text.css('right',(w-x)/2);
    }
    if(y > h/2){/*上边元素*/
      text.css('top',y/2);
    }else{/*下边元素*/
      text.css('bottom',(h-y)/2);
    }

    if( cfg.data[i][2] ){
      text.css('color',cfg.data[i][2]); /*文本颜色*/
      // text.css('color','#fff'); 
      // text.css('backgroundColor',cfg.data[i][2]); 
    }
    text.css('opacity',0);/*默认隐藏*/
    component.append(text);/*添加到组件*/
  }



  //  加入一个蒙板层
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;
  $(cns).css('zIndex',3);
  component.append(cns);
  ctx.fillStyle='#eee';
  ctx.strokeStyle='#eee';
  ctx.lineWidth = 1;
  //  生长动画
  var draw = function( per ){
    /*清除之前的蒙层圆*/
    ctx.clearRect(0,0,w,h);
    /*开始绘图*/
    ctx.beginPath();
    /*移动到圆心*/
    ctx.moveTo(r,r);
    if(per <=0){/*动画结束之后才开始文本的动画*/
      ctx.arc(r,r,r,0,2*Math.PI);/*顺时针显示*/
      component.find('.text').css('opacity',0);/*默认隐藏*/
    }else{
      ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);/*逆时针画图则清除*/
    }
    /*填充颜色*/
    ctx.fill();
    /*绘图*/
    ctx.stroke();
    if( per >= 1){/*动画完成之后才开始文本的动画*/
      component.find('.text').css('transition','all 0s');
      H5ComponentPie.reSort( component.find('.text') );
      component.find('.text').css('transition','all 1s');
      component.find('.text').css('opacity',1);/*文本显示*/
      ctx.clearRect(0,0,w,h);
    }
  }
  draw(0);



  component.on('onLoad',function(){
    //  饼图生长动画
      var s = 0;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s+=.01;
            draw(s);
        },i*10+500);
      }
  });
  component.on('onLeave',function(){
    //  饼图退场动画
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

//  重排项目文本元素
H5ComponentPie.reSort = function( list ){

  //  1. 检测相交
  var compare = function( domA, domB ){

    //  元素的位置，不用 left，因为有时候 left为 auto
    var offsetA = $(domA).offset();
    var offsetB = $(domB).offset();

    //  domA 的投影
    var shadowA_x = [ offsetA.left,$(domA).width()  + offsetA.left ];
    var shadowA_y = [ offsetA.top ,$(domA).height() + offsetA.top ];

    //  domB 的投影
    var shadowB_x = [ offsetB.left,$(domB).width()  + offsetB.left ];
    var shadowB_y = [ offsetB.top ,$(domB).height() + offsetB.top  ];

    //  检测 x
    var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] &&  shadowA_x[1] < shadowB_x[1]  );

    //  检测 y 轴投影是否相交
    var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] &&  shadowA_y[1] < shadowB_y[1]  );
    return intersect_x && intersect_y;
  }


  //  2. 错开重排
  var reset = function( domA, domB ){

    if( $(domA).css('top') != 'auto' ){

      $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height() );
    }
    if( $(domA).css('bottom') != 'auto' ){

      $(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height() );
    }

  }

  //  定义将要重排的元素
  var willReset = [list[0]];

  $.each(list,function(i,domTarget){
    if( compare(willReset[willReset.length-1] , domTarget ) ){
      willReset.push(domTarget);  //  不会把自身加入到对比
    }
  });

  if(willReset.length >1 ){
      $.each(willReset,function(i,domA){
          if( willReset[i+1] ){
            reset(domA,willReset[i+1]);
          }
      });
      H5ComponentPie.reSort( willReset );
  }

}









