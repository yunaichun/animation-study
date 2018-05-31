/**
 * [H5ComponentBase 为每个section页面添加组件component。
 * @param {[type]} uniqueClassName [每个组件的独立样式' h5_component_name_'+uniqueClassName]
 * @param {[type]} classObject     [每个组件的样式对象]
 *
 * 每个component公共样式为  h5_component、h5_component_base
 * 每个component独立样式为' h5_component_name_'+uniqueClassName
 * 每个component的载入样式' h5_component_'+classObject.type+'_load'     
 * 每个component的载出样式' h5_component_'+classObject.type+'_leave'                                
 */
var H5ComponentBase=function(uniqueClassName, classObject){
    var classObject = classObject || {};
    var id = ( 'h5_c_'+Math.random() ).replace('.','_') ;
    var baseClassName = ' h5_component_'+classObject.type; 
    var component = $('<div class="h5_component '+baseClassName+' h5_component_name_'+uniqueClassName+'" id="'+id+'">');

    classObject.text   &&  component.text(classObject.text);//文本
    classObject.width  &&  component.css('width',classObject.width+'rem');//宽度
    classObject.height &&  component.css('height',classObject.height+'rem');//高度
    classObject.bg  && component.css('backgroundImage','url('+classObject.bg+')');//背景图片
    classObject.css && component.css( classObject.css );//css整体样式
    if( classObject.center === true){//水平居中
        component.css({
            marginLeft : ( classObject.width/2 * -1) + 'rem',
            left:'50%'
        })
    }
    if( typeof classObject.onclick === 'function' ){//组件点击事件
        component.on('click',classObject.onclick);
    }
    /*自定义组件载入事件*/
    component.on('onLoad',function(){
        setTimeout(function(){
            component.addClass(baseClassName+'_load').removeClass(baseClassName+'_leave');
            classObject.animateIn && component.animate( classObject.animateIn );
        },classObject.delay || 0)
        return false;
    })
    /*自定义组件载出事件*/
    component.on('onLeave',function(){
        setTimeout(function(){
            component.addClass(baseClassName+'_leave').removeClass(baseClassName+'_load');
            classObject.animateOut && component.animate( classObject.animateOut );
         },classObject.delay || 0)
        return false;
    })
    return component;
}