/* 基本图文组件对象 */

var H5ComponentBase =function ( name, cfg ) {
    /*等于输入的配置*/
    var cfg = cfg || {};
    /*一个页面可能有很多个这个实例化对象，为每一个实例化区分*/
    var id = ( 'h5_c_'+Math.random() ).replace('.','_') ;

    // 把当前的组建类型添加到样式中进行标记
    var cls = ' h5_component_'+cfg.type; 
    /*创建一个元素*/
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');

    /*文本内容*/
    cfg.text   &&  component.text(cfg.text);
    /*文本宽度*/
    cfg.width  &&  component.width(cfg.width/2);
    /*文本高度*/
    cfg.height &&  component.height(cfg.height/2);

    /*自定义css样式*/
    cfg.css && component.css( cfg.css );
    /*背景图片*/
    cfg.bg  && component.css('backgroundImage','url('+cfg.bg+')');

    /*居中*/
    if( cfg.center === true){
        component.css({
            /*左边距为整体宽度的一半*/
            marginLeft : ( cfg.width/4 * -1) + 'px',
            /*再相对向左移动50%*/
            left:'50%'
        })
    }




    //  ... 很多自定义的参数
    if( typeof cfg.onclick === 'function' ){
        /*定义页面组件的点击事件*/
        component.on('click',cfg.onclick);
    }




    /*组件载入事件*/
    component.on('onLoad',function(){
        /*动画延时*/
        setTimeout(function(){
            component.addClass(cls+'_load').removeClass(cls+'_leave');
            /*animate动画*/
            cfg.animateIn && component.animate( cfg.animateIn );
        },cfg.delay || 0)

        return false;
    })
    /*组件离开事件*/
    component.on('onLeave',function(){
        /*动画延时*/
        setTimeout(function(){
            component.addClass(cls+'_leave').removeClass(cls+'_load');
            /*animate动画*/
            cfg.animateOut && component.animate( cfg.animateOut );
         },cfg.delay || 0)
        return false;
    })

    /*返回一个元素*/
    return component;
}