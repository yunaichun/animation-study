$(function() {
    var h5 = new H5();
        /*每页的底部都添加相同的背景元素*/
    h5.whenAddPage = function(){
        this.addComponent('slide_up',{
            bg:'imgs/footer.png',
            css:{
                opacity:0,
                left:0,
                bottom:-20,
                width:'100%',
                height:'0.4rem',
                zIndex:999
            },
            animateIn:{
                opacity:1,bottom:'-0.02rem'
            },
            animateOut:{
                opacity:0,bottom:'-0.4rem'
            },
            delay:500
        });
    };
    //每个section独立样式为'h5_page_' + uniqueClassName（传参的话）
    //每个component独立样式为' h5_component_name_'+uniqueClassName 
    h5
    .addPage('face')
        .addComponent('logo', {
            center: true,
            width: 3.95,
            height: 1.30,
            bg: 'imgs/face_logo.png',
            css: { opacity: 0 },
            animateIn: { top: '2rem', opacity: 1 },
            animateOut: { top: 0, opacity: 0 },
        })
        .addComponent('slogan', {
            center: true,
            width: 3.65,
            height: 0.99,
            bg: 'imgs/face_slogan.png',
            css: { opacity: 0, top: '3.6rem' },
            animateIn: { left: '50%', opacity: 1 },
            animateOut: { left: '0%', opacity: 0 },
            delay: 500
        })
        .addComponent('face_img_left', {
            width: 3.70, 
            height: 4.93,
            bg: 'imgs/face_img_left.png',
            css: { opacity: 0, left: '-1rem', bottom: '-1rem' },
            animateIn: { opacity: 1, left: 0, bottom: 0 },
            animateOut: { opacity: 0, left: '-1rem', bottom: '-1rem' },
            delay: 1000
        })
        .addComponent('face_img_right', {
            width: 2.76,
            height: 4.49,
            bg: 'imgs/face_img_right.png',
            css: { opacity: 0, right: '-1rem', bottom: '-1rem' },
            animateIn: { opacity: 1, right: 0, bottom: 0 },
            animateOut: { opacity: 0, right: '-1rem', bottom: '-1rem' },
            delay: 1000
        })
    .addPage('transition')
        .addComponent('bg',{
            center:true,
            width:4,
            height:4,
            css:{top:'2rem'},
            bg: 'http://p3.qhimg.com/t0134c65e59012a1257.png',
        })
        .addComponent('girl',{
            width:3,
            height:2.84,
            bg: 'http://p4.qhimg.com/t0160e6a92121691e22.png',
            css:{opacity: 0,top: 0,left:0},
            animateIn: { opacity: 1, top: '2rem', marginLeft : ( 3/2 * -1) + 'rem', left: '50%'},
            animateOut: { opacity: 0, top: 0, left:0},
            delay: 500
        })
    .addPage('3')
    .addPage('4')
        .addComponent('1', {
            type : '1',
            height: 1,
            bg: 'H5/22/2.png',
            css: { top: '4%', width:'100%'},
        })
        .addComponent('2', {
            type : '2',
            height: 2,
            width:2,
            bg: 'H5/22/3.png',
            css: { top: '13%',left:'39%'},
        })
        .addComponent('3', {
            type : '3',
            height: 5,
            bg: 'H5/22/4.png',
            css: { top: '26%',left:'11%',width:'80%'},
        })
        .addComponent('4', {
            type : '4',
            height: 5,
            bg: 'H5/22/4.png',
            css: { bottom: '3%',left:'11%',width:'80%'},
        })
    .addPage()
        .addComponent('polyline',{
            type:'polyline',
        })
    .loadPage();
})
