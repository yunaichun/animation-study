// import './components/1、es';
// import './components/2、ts.ts';

// /* 一、第三方依赖提取测试 */
// import * as _ from 'lodash';
// /* 同步模块的公共代码提取 */
// import './components/3、代码分割/pageA.js';
// import './components/3、代码分割/pageB.js';
// /* require.ensure、require.include、import测试 */
// // import './components/3、代码分割/async.js';
// /*异步模块的公共代码提取*/
// // import './components/3、代码分割/asyncPageA.js';
// // import './components/3、代码分割/asyncPageB.js';

/*二、css相关 loader 测试*/
// let flag = true;
// setInterval(function () {
//     if (flag) {
//         base.use();
//     } else {
//         base.unuse();
//     }
//     flag = !flag;
// }, 500);
// console.log(1111111, base);
// import base from './css/base.less';
// import common from './css/common.less';
// import(
//     /* webpackChunkName: async-less */
//     './components/4、css/a'
// ).then(function(asyncLess) {console.log(asyncLess)});

// console.log(11111111, base);
// let app = document.getElementById('app');
// app.innerHTML = '<div class="" + base.box + '""></div>';

/*三、Tree Shaking测试*/
//  import { a } from './components/5.TreeShaking.js';
// console.log(a());

/*四、图片、字体等测试*/
import './css/base.less';
import './css/common.less';
import './css/components/a.less';
/*六、打包性能优化-分离 vendor 和 app*/
import Vue from 'vue';
import { Button } from 'element-ui';
Vue.component(Button);

/*五、第三方插件注入*/
$('div').addClass('new3');

$.get('/place/queryMapInitData', function (data) {
    console.log(data);
});

if (module.hot) {
    module.hot.accept();
}
