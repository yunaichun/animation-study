/* 雷达图组件对象 */

var H5ComponentRadar =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  
  //  绘制网格线 - 背景层
  var w = cfg.width;
  var h = cfg.height;

  //  加入一个画布（网格线背景）
  var cns = document.createElement('canvas');
  /*getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。*/
  var ctx = cns.getContext('2d');
  /*画布宽度*/
  cns.width = ctx.width = w;
  /*画布高度*/
  cns.height = ctx.height =h;
  /*将画布放在组件中去*/
  component.append(cns);



  /*定义半径*/
  var r = w/2;
  /*定义等分个数，来自配置项传入个数*/
  var step = cfg.data.length;
  //  计算一个圆周上的坐标（计算多边形的顶点坐标）
  //  已知：圆心坐标(a,b)、半径 r；角度deg。
  //  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i
  //  x = a + Math.sin( rad ) * r;
  //  y = b + Math.cos( rad ) * r;
  //  绘制网格背景（分面绘制，分为10份）
  var isBlue = false;
  for( var s = 10;s >0 ;s--){
    /*开始画线。beginPath()方法：起始一条路径，或重置当前路径*/
    ctx.beginPath();
    for( var i=0;i<step;i++){
      /*弧度*/
      var  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;
      /*x坐标*/
      var x = r + Math.sin( rad ) * r * (s/10);/*x坐标十次递减*/
      /*y坐标*/
      var y = r + Math.cos( rad ) * r * (s/10);/*y坐标十次递减*/

      /*ctx.beginPath();
      cxt.arc(x,y,r,0,2*Math.PI);
      cxt.stroke();*/

      /*添加一个新点，然后在画布中创建从该点到最后指定点的线条*/
      ctx.lineTo(x,y);    
    }
    /*创建从当前点回到起始点的路径*/
    ctx.closePath();
    /*fillStyle设置或返回用于填充绘画的颜色、渐变或模式*/
    ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
    /*填充当前绘图（路径）*/
    ctx.fill();
  }




  //绘制伞骨(基于数据的长度)，背景层是不变的
  for(var i = 0;i<step;i++){

    
    var  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;/*弧度*/
    var x = r + Math.sin( rad ) * r ;/*此时x不需要乘以比例，直接到达边缘*/
    var y = r + Math.cos( rad ) * r ;/*此时y不需要乘以比例，直接到达边缘*/
    /*移动到圆心*/
    ctx.moveTo(r,r);
    /*指定到x，y*/
    ctx.lineTo(x,y);


    //  输出项目文字
    var text = $('<div class="text">');
    text.text( cfg.data[i][0] );
    text.css('transition','all .5s '+ i*.1 + 's');
    if( x > w/2 ){
     text.css('left',x/2+5);
    }else{/*左边的元素*/
     text.css('right',(w-x)/2+5);
    }
    if( y > h/2){/*上面的元素*/
      text.css('top',y/2+5);
    }else{/*下面的元素*/
      text.css('bottom',(h-y)/2+5);
    }
    if( cfg.data[i][2] ){/*颜色存在的话*/
      text.css('color',cfg.data[i][2]);
    }
    text.css('opacity',0);/*默认隐藏*/
    /*加入组件*/
    component.append(text);
  }
  /*设置或返回用于笔触的颜色、渐变或模式*/
  ctx.strokeStyle = '#e0e0e0';
  /*收笔：绘制已定义的路径*/
  ctx.stroke();





  //  数据层的开发
  //  加入一个画布（数据层）
  var cns = document.createElement('canvas');
  /*getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。*/
  var ctx = cns.getContext('2d');
  /*画布宽度*/
  cns.width = ctx.width = w;
  /*画布高度*/
  cns.height = ctx.height =h;
  /*将画布放在组件中去*/
  component.append(cns);
  /*设置或返回用于笔触的颜色、渐变或模式*/
  ctx.strokeStyle = '#f00';
  var draw = function( per ){
    if(per <= 1){/*退场动画*/
        component.find('.text').css('opacity',0);
    }
    if(per >= 1){/*入场动画*/
        component.find('.text').css('opacity',1);/*默认为0，载入时候变为1，这样的动画*/
    }
    /*在给定的矩形内清除指定的像素，不然之前画的全部存在*/
    ctx.clearRect(0,0,w,h);



    //  输出数据的折线
    for(var i=0;i<step;i++){
      var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;      
      var rate  = cfg.data[i][1] * per;/*数据点比例*/
      var x = r + Math.sin( rad ) * r * rate;
      var y = r + Math.cos( rad ) * r * rate ;
      /*指定到x，y。将点连接起来*/
      ctx.lineTo(x,y);
    }
    /*创建从当前点回到起始点的路径*/
    ctx.closePath();
    /*收笔：绘制已定义的路径*/
    ctx.stroke();




    //  输出数据的点
    /*fillStyle设置或返回用于填充绘画的颜色、渐变或模式*/
    ctx.fillStyle = '#ff7676';
    for(var i=0;i<step;i++){
      var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;      
      var rate  = cfg.data[i][1] * per ;/*传入per*/
      var x = r + Math.sin( rad ) * r * rate;
      var y = r + Math.cos( rad ) * r * rate ;
      /*开始画线。beginPath()方法：起始一条路径，或重置当前路径*/
      ctx.beginPath();
      /*绘制圆点*/
      ctx.arc(x,y,5,0,2*Math.PI);
      /*填充当前绘图（路径）*/
      ctx.fill();
      /*创建从当前点回到起始点的路径*/
      ctx.closePath();
    }
  }



  component.on('onLoad',function(){
    //  雷达图生长动画
      var s = 0;
      for( i=0;i<100;i++){
        setTimeout(function(){
            s+=.01;
            draw(s);
        },i*10+500);
      }
  });
  component.on('onLeave',function(){
    //  雷达图退场动画
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