/**
 * [H5ComponentPolyline 为每个section页面添加组件component。
 * @param {[type]} uniqueClassName [每个组件的独立样式' h5_component_name_'+uniqueClassName]
 * @param {[type]} classObject     [每个组件的样式对象]
 *
 * 每个component公共样式为  h5_component、h5_component_base
 * 每个component独立样式为' h5_component_name_'+uniqueClassName
 * 每个component的载入样式' h5_component_'+classObject.type+'_load'     
 * 每个component的载出样式' h5_component_'+classObject.type+'_leave'                                
 */
var H5ComponentPolyline = function(uniqueClassName, classObject) {

    var component = new H5ComponentBase(uniqueClassName, classObject);
	var cns = document.createElement('canvas'); /*画布*/
	var ctx = cns.getContext('2d');
	var w = classObject.width;
	var h = classObject.height;
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);



	var step=10;
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle='#AAAAAA';
   
}
