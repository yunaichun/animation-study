var H5_loading = function  (images,firstPage) {
        /*h5对象中的属性id*/
        var id = this.id;
        // 第一次进入（是undenfined）
        if(this._images === undefined ){ 
            /*多少图片需要加载*/
            this._images = ( images || [] ).length;
            /*一开始加载0个资源*/
            this._loaded = 0 ;

            //把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调
            window[id] = this;

            /*循环图片资源对象，取出所有图片资源*/
            for(s in images){
                /*取出图片资源，就是loader传入的数组*/
                var item = images[s];
                /*创建图片对象*/
                var img = new Image;
                /*图片载入之后*/
                img.onload = function(){

                    window[id].loader();

                }
                /*为图片指定地址，可以把图片载入缓存*/
                img.src = item;
            }
            /*初始为0%*/
            $('#rate').text('0%');
            /*返回this，和h5对象一致*/
            return this;
        }else{
            /*载入计数增加*/
            this._loaded ++ ;
            /*进度条增加*/
            $('#rate').text(  ( ( this._loaded / this._images  *100) >> 0 ) + '%' );
            /*当前载入资源还是小于资源长度*/
            if(this._loaded < this._images){
                /*依然返回this*/
                return this;
            }
        }
        /*归位*/
        window[id] = null;

        /*处理后续页面*/
        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
}