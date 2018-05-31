/**
 * [H5 内容组织类]
 * [addPage         添加fullpage一个页面section]
 * [addComponent    为section添加组件]
 * [loadPage        显示所有页面section(最外层显示)]
 *
 * 包裹section的样式为 h5
 * 包裹section的id 为 h5_' + Math.random()
 */
var H5 = function() {
    //包裹section的div
    this.id = ('h5_' + Math.random()).replace('.', '_');
    this.el = $('<div class="h5" id="' + this.id + '">').hide();
    $('body').append(this.el);
    this.page = [];

    /**
     * [addPage 添加fullpage的一个section]
     * @param {[uniqueClassName]} name [每个页面的独立样式]
     * @param {[onlyPageText]} text [每个页面的独立文本描述]
     *
     * 每个section公共样式为 section、h5_page，
     * 每个section独立样式为'h5_page_' + uniqueClassName（传参的话）
     */
    this.addPage = function(uniqueClassName, onlyPageText) {
        //公共样式h5_page
        var page = $('<div class="section h5_page">');
        if (uniqueClassName != undefined) {
            page.addClass('h5_page_' + uniqueClassName);
        }
        if (onlyPageText != undefined) {
            page.text(onlyPageText);
        }
        this.el.append(page);
        this.page.push(page);
        if( typeof this.whenAddPage === 'function' ){
            this.whenAddPage();
        }
        return this;
    };
    /**
     * [addComponent 为每个section页面添加组件component]
     * @param {[type]} uniqueClassName [每个组件的独立样式：' h5_component_name_'+uniqueClassName]
     * @param {[type]} classObject     [每个组件的样式对象]
     */
    this.addComponent = function(uniqueClassName, classObject) {
        var classObject = classObject || [];
        classObject = $.extend({ 'type': 'base' }, classObject);
        var currentPage = this.page.slice(-1)[0];
        var component;
        switch (classObject.type) {
            /*折线图*/
            case 'polyline' :
                component = new H5ComponentPolyline(uniqueClassName, classObject);
                break;
            /*饼图*/
            case 'pie' :
                component = new H5ComponentPie(uniqueClassName, classObject);
                break;
            /*水平柱图*/
            case 'bar' :
                component = new H5ComponentBar(uniqueClassName, classObject);
                break;
            /*垂直柱图*/
            case 'bar_v' :
                component = new H5ComponentBar_v(uniqueClassName, classObject);
                break;
            /*雷达图*/
            case 'radar' :
                component = new H5ComponentRadar(uniqueClassName, classObject);
                break;
            /*环图*/
            case 'ring' :
                component = new H5ComponentRing(uniqueClassName, classObject);
                break;
            /*散点图*/
            case 'point' :
                component = new H5ComponentPoint(uniqueClassName, classObject);
                break;
            default:
                component = new H5ComponentBase(uniqueClassName, classObject);
                break;
        }

        currentPage.append(component);      
        return this;
    };
    /**
     * [loadPage 默认显示第一页section的第一个组件component]
     * @param  {[type]} moveToPage [传参数指定移动到某一页]
     */
    this.loadPage=function(moveToPage){
    	this.el.fullpage({
            //滚动前的回调函数[http://www.jq22.com/jquery-info1124]
    		onLeave:function(index,nextIndex,direction){
    			$(this).find('.h5_component').trigger('onLeave');
    		},
            //滚动后的回调函数
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_component').trigger('onLoad');
            }
    	});
        //默认显示第一页第一个组件
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(moveToPage){
            $.fn.fullpage.moveTo( moveToPage );
        }
    }
}
