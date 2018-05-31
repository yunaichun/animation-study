/* 内容管理对象 */

var H5 =function ( ) {
    /*一个页面可能有很多个这个实例化对象，为每一个实例化区分*/
    this.id = ('h5_'+Math.random()).replace('.','_');
    /*创建一个元素*/
    this.el = $('<div class="h5" id="'+this.id+'">').hide();
    
    /*定义页面为一个数组*/
    this.page = [];
    /*直接添加在页面末尾*/
    $('body').append( this.el );


    /**
     * 新增一个页
     * @param {string} name 组建的名称，会加入到ClassName中
     * @param {string} text 页内的默认文本
     * @return {H5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function( name , text ){
        /*fullpage的其中一个页面*/
        var page = $('<div class="h5_page section">');

        if( name != undefined ){
            /*传入name的话*/
            page.addClass('h5_page_'+name);
        }
        if( text != undefined ){
            /*传入text的话*/
            page.text(text);
        }
        /*将次page放在el最外层保卫div中*/
        this.el.append(page);
        /*整合页面用的，每次添加页面都存入page中保存*/
        this.page.push( page );



        /*每个页面底部都添加相同的背景元素*/
        if( typeof this.whenAddPage === 'function' ){
            this.whenAddPage();
        }




        //返回本身，可以实现链式调用
        return this;
    }

    /* 新增一个组件 */
    this.addComponent = function(name, cfg){
        /*初始化传入对象*/
        var cfg = cfg || {};
        /*如果传入的cfg中没有type会默认给type加一个值*/
        cfg = $.extend({
             type : 'base'
         },cfg);

        var component;  //  定义一个变量，存储 组件元素

        /*拿到当前页面，标准对象，实现链式调用（组件添加到哪个页面）*/
        var page = this.page.slice(-1)[0];
        switch( cfg.type ){
            /*基本图文组件*/
            case 'base' :
                component = new H5ComponentBase(name,cfg);
                break;
            /*折线图*/
            case 'polyline' :
                component = new H5ComponentPolyline(name,cfg);
                break;
            /*饼图*/
            case 'pie' :
                component = new H5ComponentPie(name,cfg);
                break;
            /*水平柱图*/
            case 'bar' :
                component = new H5ComponentBar(name,cfg);
                break;
            /*垂直柱图*/
            case 'bar_v' :
                component = new H5ComponentBar_v(name,cfg);
                break;
            /*雷达图*/
            case 'radar' :
                component = new H5ComponentRadar(name,cfg);
                break;
            /*环图*/
            case 'ring' :
                component = new H5ComponentRing(name,cfg);
                break;
            /*散点图*/
            case 'point' :
                component = new H5ComponentPoint(name,cfg);
                break;
            default:
        }

        page.append(component);
        return this;
    }
    /* H5对象初始化呈现*/
    /*内容组织管理，有可能会加载若干个资源，可以在很多资源加载之后，再把页面呈现出来*/
    this.loader = function( firstPage ){
        /*this.el.fullpage();*/
        /*el是最外层的h5*/
        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                /*el里面的h5_component离开事件（在H5ComponentBase组件中）*/
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                /*el里面的h5_component加载事件（在H5ComponentBase组件中）*/
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        /*主动触发事件*/
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();




        /*判断进入第几页*/
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );/*立刻切换到某一页*/
        }
    }



    /*判断是否有加载动画js*/
    this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;
    return this;
}