import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import VueLazyload from 'vue-lazyload'

import flexible from './libs/flexible';
import Reset from './less/reset'
import vTitle from './directives/vTitle';

require('./libs/qrCode')

Vue.use(VueResource);
Vue.use(VueLazyload);

// Vue.directive('scrollUp',{
// 	bind(el,binding){
// 		el.
// 	}
// })


// router.beforeEach((to,from,next)=>{
// 	store.commit('SETROUTERLOADING',{
// 		loading:false
// 	});
// 	next();
// });

// router.afterEach(route=>{
// 	store.commit('SETROUTERLOADING',{
// 		loading:false
// 	});
// })

// Vue.mixin({
// 	beforeCreate(){
// 		function onBridgeReady(){
//       	 WeixinJSBridge.call('hideOptionMenu');
//       	}
      	
//       	if (typeof WeixinJSBridge == "undefined"){
//       	    if( document.addEventListener ){
//       	        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//       	    }else if (document.attachEvent){
//       	        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
//       	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//       	    }
//       	}else{
//       	    onBridgeReady();
//       	}
// 	}
// })

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
});




Vue.config.devtools = true
